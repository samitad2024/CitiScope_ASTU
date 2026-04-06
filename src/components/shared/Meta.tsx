import React from 'react';
import { Helmet } from 'react-helmet-async';

interface MetaProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: string;
}

export const Meta: React.FC<MetaProps> = ({
  title = 'CitiScope | Smart City Administration Dashboard',
  description = 'Comprehensive smart city administration dashboard for monitoring infrastructure and managing citizen issues.',
  keywords = 'smart city, dashboard, urban management, Ethiopia, CitiScope',
  ogTitle,
  ogDescription,
  ogImage,
  twitterCard = 'summary_large_image',
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:type" content="website" />
      
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={ogTitle || title} />
      <meta name="twitter:description" content={ogDescription || description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
    </Helmet>
  );
};
