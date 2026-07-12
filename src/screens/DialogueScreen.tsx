import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGameStore } from '../store/gameStore';
import GameLayout from '../components/GameLayout';
import DialogueBox from '../components/DialogueBox';
import MomentLimite from '../components/MomentLimite';
import { getStoryById } from '../data/story/index';
import { dialogueText, optionText, momentLimitText, momentOptionText, momentOptionResultText } from '../i18n/helpers';
import type { DialogueNode } from '../store/types';

interface DialogueScreenProps {
  chapterIndex: number;
  onComplete: () => void;
}

export default function DialogueScreen({ chapterIndex, onComplete }: DialogueScreenProps) {
  const { t } = useTranslation();
  const updateStats = useGameStore((s) => s.updateStats);
  const recordDecision = useGameStore((s) => s.recordDecision);
  const stats = useGameStore((s) => s.stats);
  const chosenBook = useGameStore((s) => s.chosenBook);
  const statsRecord: Record<string, number> = stats as unknown as Record<string, number>;

  const story = chosenBook ? getStoryById(chosenBook) : null;
  const chapter = story?.chapters[chapterIndex];
  const [currentNodeIndex, setCurrentNodeIndex] = useState(0);
  const [showMomentLimit, setShowMomentLimit] = useState(false);

  const currentNode: DialogueNode | undefined = chapter?.dialogue[currentNodeIndex];
  const hasMomentLimit = chapter?.momentLimit !== undefined;

  const getSpeakerName = (speaker: string): string => {
    const key = speaker.toLowerCase();
    if (['melquisedec', 'merce', 'englishman', 'alchemist', 'narrator'].includes(key)) {
      return t(`characters.${key}`);
    }
    return speaker;
  };

  const handleOption = (optionId: string) => {
    const opt = currentNode?.options.find((o) => o.id === optionId);
    if (!opt) return;

    // Apply effects
    updateStats(opt.effects);
    recordDecision(chapter?.id ?? '', currentNode?.id ?? '', optionId);

    // Check for next node
    if (opt.nextNodeId) {
      const nextIdx = chapter?.dialogue.findIndex((d) => d.id === opt.nextNodeId) ?? -1;
      if (nextIdx !== -1) {
        setCurrentNodeIndex(nextIdx);
        return;
      }
    }

    // If dialogue ends here, check for moment limit or complete
    if (hasMomentLimit) {
      setShowMomentLimit(true);
    } else {
      onComplete();
    }
  };

  const handleMomentOption = (optionId: string) => {
    const opt = chapter?.momentLimit?.options.find((o) => o.id === optionId);
    if (!opt) return;
    updateStats(opt.effects);
    recordDecision(chapter?.id ?? '', 'moment_limit', optionId);
  };

  const handleMomentComplete = () => {
    setShowMomentLimit(false);
    onComplete();
  };

  if (!currentNode) return null;

  if (showMomentLimit && chapter?.momentLimit) {
    const ml = chapter.momentLimit;
    return (
      <GameLayout>
        <div className="h-full p-4 max-w-2xl mx-auto">
          <MomentLimite
            text={momentLimitText(t, chosenBook ?? '', chapter.id)}
            timeSeconds={ml.timeSeconds}
            options={ml.options.map((opt) => ({
              id: opt.id,
              text: momentOptionText(t, chosenBook ?? '', chapter.id, opt.id),
              requirements: opt.requirements as Partial<Record<string, number>> | undefined,
              currentStats: statsRecord,
              effects: opt.effects as Record<string, number>,
              resultText: momentOptionResultText(t, chosenBook ?? '', chapter.id, opt.id),
              onClick: () => {
                handleMomentOption(opt.id);
              },
            }))}
            onTimeout={handleMomentComplete}
          />
        </div>
      </GameLayout>
    );
  }

  return (
    <GameLayout>
      <div className="h-full p-4">
        <DialogueBox
          speaker={getSpeakerName(currentNode.speaker)}
          text={dialogueText(t, chosenBook ?? '', currentNode.id)}
          speakerSprite={currentNode.sprite}
          options={currentNode.options.map((opt) => ({
            id: opt.id,
            text: optionText(t, chosenBook ?? '', opt.id),
            disabled: false,
            onClick: () => handleOption(opt.id),
          }))}
        />
      </div>
    </GameLayout>
  );
}