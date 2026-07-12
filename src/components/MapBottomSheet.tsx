import { useTranslation } from 'react-i18next';
import { useGameStore } from '../store/gameStore';
import { getStoryById } from '../data/story/index';
import { chapterTitle, chapterDescription } from '../i18n/helpers';

interface MapBottomSheetProps {
  onPlay: () => void;
}

export default function MapBottomSheet({ onPlay }: MapBottomSheetProps) {
  const { t } = useTranslation();
  const currentChapter = useGameStore((s) => s.currentChapter);
  const chosenBook = useGameStore((s) => s.chosenBook);

  const story = chosenBook ? getStoryById(chosenBook) : null;
  const chapter = story?.chapters[currentChapter];

  return (
    <div className="pointer-events-auto h-full" onClick={onPlay}>
      {/* Chapter info — pinned below the header/date bars, above the map */}
      <div className="fixed top-[76px] left-0 right-0 z-40 px-3 pointer-events-none">
        <div className="bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/10 max-w-xs">
          <span className="text-xs text-white font-semibold uppercase tracking-wider">
            {chapter ? chapterTitle(t, chosenBook ?? '', chapter.id) : t('map.explore')}
          </span>
          <p className="text-gray-200 text-xs mt-0.5">
            {chapter ? chapterDescription(t, chosenBook ?? '', chapter.id) : ''}
          </p>
        </div>
      </div>
    </div>
  );
}