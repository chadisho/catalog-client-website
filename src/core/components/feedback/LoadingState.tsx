import { getCommonDirection, getCommonTranslations, type CommonLocale } from '../../i18n/commonLocale';
import { Vortex } from 'react-loader-spinner'
interface LoadingStateProps {
  locale?: CommonLocale;
}

export default function LoadingState({ locale = 'en' }: LoadingStateProps) {
  const t = getCommonTranslations(locale);
  const direction = getCommonDirection(locale);

    return (
      <div className="flex items-center justify-center h-screen">
    <Vortex
visible={true}
height="80"
width="80"
ariaLabel="vortex-loading"
wrapperStyle={{}}
wrapperClass="vortex-wrapper"
colors={['#0586ff', '#02c13e', '#fe2746', 'yellow','orange','#fe2746']}
    />
            </div>
  );
}
