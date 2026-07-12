import { useTranslation } from 'react-i18next';
import { useGameStore } from '../store/gameStore';
import GameLayout from '../components/GameLayout';
import LocationImage from '../components/LocationImage';
import HomeActivities from '../components/HomeActivities';
import { getCityById, getHomeLocation } from '../data/cities/index';

interface HomeScreenProps {
  onGoToMap: () => void;
}

export default function HomeScreen({ onGoToMap }: HomeScreenProps) {
  const { t, i18n } = useTranslation();
  const chosenCity = useGameStore((s) => s.chosenCity);

  const city = chosenCity ? getCityById(chosenCity) : null;
  const home = city ? getHomeLocation(city) : null;
  const homeName = home
    ? (i18n.language === 'ca' ? home.nameCa ?? home.name : i18n.language === 'es' ? home.nameEs ?? home.name : home.name)
    : '';
  const homeDesc = home
    ? (i18n.language === 'ca' ? home.descriptionCa : i18n.language === 'es' ? home.descriptionEs : home.description)
    : '';

  return (
    <GameLayout showMapButton={false}>
      <div className="flex flex-col h-full">

        {/* ── Scrollable content ── */}
        <div className="flex-1 overflow-y-auto min-h-0">
          <div className="max-w-2xl mx-auto fade-in p-4">

            {/* ── Hero image with identity overlay ── */}
            <div className="relative w-full h-56 rounded-xl overflow-hidden">
              <LocationImage
                locationId={home?.id ?? 'home'}
                name={homeName}
                type="home"
                className="w-full h-full"
              />
              {/* gradient scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10" />
              {/* identity anchored to bottom of image */}
              <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
                <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-sm text-white/60 border border-white/10 mb-1.5">
                  🏠 home
                </span>
                <h2 className="text-white font-bold text-xl leading-tight">{homeName}</h2>
              </div>
            </div>

            {/* ── Content below hero ── */}
            <div className="mt-3 px-4 pt-4 pb-3 bg-black/75 backdrop-blur-sm rounded-xl">
              {homeDesc && (
                <p className="story-text text-gray-300 text-sm leading-relaxed mb-2">{homeDesc}</p>
              )}
              <p className="story-text text-gray-300 text-sm leading-relaxed">
                {i18n.language === 'ca'
                  ? "El sol entra per la finestra. El ventilador de sosté gira. El somni d'aquesta nit encara és fresc a la teva ment. Què fas?"
                  : i18n.language === 'es'
                  ? 'El sol entra por la ventana. El ventilador de techo gira. El sueño de esta noche aún está fresco en tu mente. ¿Qué haces?'
                  : "Sunlight streams through the window. The ceiling fan turns. Last night's dream is still fresh in your mind. What do you do?"}
              </p>
            </div>
          </div>
        </div>

        {/* ── Sticky morning activities + go outside button ── */}
        <div className="shrink-0 px-4 py-3 bg-[#191919] border-t border-gray-700">
          <div className="max-w-2xl mx-auto flex flex-col gap-2">
            <HomeActivities />
            <button
              onClick={onGoToMap}
              className="w-full py-4 rounded-xl font-bold text-base text-white bg-gradient-to-r from-[#22c55e] to-[#16a34a] shadow-lg shadow-[#22c55e]/25 hover:brightness-110 active:scale-[0.98] transition-all"
            >
              ☀️ {t('home.goOut')} →
            </button>
          </div>
        </div>

      </div>
    </GameLayout>
  );
}