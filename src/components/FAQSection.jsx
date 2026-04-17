import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { motion } from 'framer-motion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SectionTransition from './SectionTransition';

const faqData = [
  {
    question: "Quel est votre stack technique principal ?",
    answer: "Je travaille principalement avec le stack MERN (React, Node.js). Je maîtrise particulièrement React avec TypeScript, Material-UI pour le design system, Framer Motion pour les animations, et je déploie sur Vercel/Netlify. J'utilise également Git pour le versioning et Figma pour le design d'interface."
  },
  {
    question: "Combien de temps faut-il pour développer un site web ?",
    answer: "Le délai dépend de la complexité : • Site vitrine simple : 2-3 semaines • Site e-commerce : 4-8 semaines • Application web complexe : 2-4 mois • Application fullstack : 3-6 mois. Je propose toujours un planning détaillé après analyse de vos besoins."
  },
  {
    question: "Proposez-vous des services de refonte de site existant ?",
    answer: "Absolument ! Je propose des refontes complètes incluant : modernisation du code, amélioration des performances, responsive design, SEO optimization, et migration vers des technologies modernes. J'analyse d'abord votre site existant pour proposer la meilleure approche."
  },
  {
    question: "Quelle est votre approche pour le responsive design ?",
    answer: "J'utilise une approche mobile-first avec CSS Grid, Flexbox, et Material-UI pour garantir une expérience optimale sur tous les appareils. Je teste sur les résolutions standards et utilise des media queries avancées pour assurer la compatibilité cross-device."
  },
  {
    question: "Comment gérez-vous le SEO dans vos projets ?",
    answer: "J'intègre le SEO technique dès le développement : meta tags optimisés, sitemap XML, structure HTML sémantique, lazy loading des images, performance optimisée (Core Web Vitals), et URLs propres. J'utilise aussi React Helmet pour les SPA et pré-rendering si nécessaire."
  },
  {
    question: "Proposez-vous la maintenance après la livraison ?",
    answer: "Oui, je propose plusieurs formules de maintenance : • Basique : corrections de bugs et mises à jour de sécurité • Standard : + ajout de petites fonctionnalités • Premium : + support prioritaire et optimisation continue. Tous mes packages incluent une période de garantie post-livraison."
  },
  {
    question: "Quelles sont vos tarifications ?",
    answer: "Je propose différents modèles : • Forfait projet (prix fixe défini à l'avance) • TJM à 80FCFA pour les missions courtes • Forfait mensuel pour la maintenance. Je fournis toujours un devis détaillé gratuit après analyse de vos besoins. Les projets simples commencent à partir de 400 000FCFA."
  },
  {
    question: "Comment se passe la collaboration à distance ?",
    answer: "J'utilise des outils professionnels : réunions vidéo (Google Meet), gestion de projet (Trello/Notion), communication (Slack/Email), et partage de code (GitHub). Je propose des points réguliers et des versions de test pour valider l'avancement ensemble."
  },
  {
    question: "Fournissez-vous une formation à la livraison ?",
    answer: "Oui, chaque livraison inclut : • Une documentation technique • Une session de formation vidéo • Un guide d'utilisation • L'accès à un espace client avec toutes les ressources. Je reste disponible pour répondre aux questions après la livraison."
  },
  {
    question: "Quelle est votre disponibilité pour nouveaux projets ?",
    answer: "Je prends généralement 1-2 nouveaux projets par mois pour garantir une qualité optimale. Mes créneaux se remplissent vite, je vous recommande de me contacter au moins 2-3 semaines à l'avance pour discuter de votre projet."
  },
  {
    question: "Travaillez-vous en équipe ou seul ?",
    answer: "Je travaille principalement en indépendant mais je collabore régulièrement avec d'autres freelances (designers UX/UI, développeurs backend, experts SEO) pour des projets plus complexes. Cela me permet d'offrir une solution complète tout en restant votre interlocuteur principal."
  },
  {
    question: "Comment assurez-vous la sécurité des sites ?",
    answer: "J'implémente les meilleures pratiques : validation des données, protection contre les injections XSS, HTTPS obligatoire, mots de passe hashés, gestion sécurisée des tokens JWT, et audits de sécurité réguliers. Je respecte également le RGPD pour la protection des données."
  },
  {
    question: "Proposez-vous l'intégration de paiements en ligne ?",
    answer: "Oui, j'intègre des solutions de paiement comme Moov Money, Airtel Money selon vos besoins. Je configure les webhooks, le traitement sécurisé des transactions, et le dashboard de gestion des commandes."
  },
  {
    question: "Quelle est votre politique de confidentialité ?",
    answer: "Je respecte strictement la confidentialité de vos données et idées. Un NDA (accord de confidentialité) peut être signé avant toute discussion. Je ne réutilise jamais le code de vos projets et supprime toutes les données après la fin de notre collaboration."
  }
];

// Variants pour les animations Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const titleVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: "easeOut"
    }
  }
};

export default function FAQSection() {
  const [expanded, setExpanded] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box
      id="faq"
      component="section"
      sx={{
        position: 'relative',
        minHeight: 'auto',
        bgcolor: 'transparent',
        px: { xs: 2, sm: 4, md: 8, lg: 10 },
        py: { xs: 6, md: 10 },
        overflow: 'hidden'
      }}
    >
      {/* Animated background */}
      <motion.div
        style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: isMobile ? 200 : 400,
          height: isMobile ? 200 : 400,
          backgroundColor: '#64ffda',
          borderRadius: '50%',
          filter: 'blur(80px)',
          zIndex: 0,
          opacity: 0.1,
        }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <Box style={{ position: 'relative', zIndex: 2 }}>
        {/* Header avec animations */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
            <motion.div variants={titleVariants}>
              <Typography
                variant="h2"
                sx={{
                  color: '#64ffda',
                  mb: 2,
                  fontWeight: 700,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  textShadow: '0 0 20px rgba(100, 255, 218, 0.5)',
                }}
              >
                Questions Fréquentes
              </Typography>
            </motion.div>
            
            <motion.div
              variants={titleVariants}
              transition={{ delay: 0.2 }}
            >
              <Divider
                sx={{
                  width: { xs: '60px', md: '80px' },
                  height: '4px',
                  mx: 'auto',
                  backgroundColor: '#64ffda',
                  boxShadow: '0 0 15px #64ffda',
                  borderRadius: '2px',
                  mb: 3,
                }}
              />
            </motion.div>

            <motion.div
              variants={titleVariants}
              transition={{ delay: 0.4 }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: '#8892b0',
                  maxWidth: '600px',
                  mx: 'auto',
                  lineHeight: 1.6,
                }}
              >
                Retrouvez ici les réponses aux questions les plus courantes sur mes services et mon expertise.
              </Typography>
            </motion.div>
          </Box>
        </motion.div>

        {/* FAQ Items avec animations */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          style={{ maxWidth: '800px', margin: '0 auto' }}
        >
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              transition={{ delay: index * 0.1 }}
            >
              <Accordion
                expanded={expanded === `panel${index}`}
                onChange={handleChange(`panel${index}`)}
                sx={{
                  bgcolor: '#112240',
                  color: '#ccd6f6',
                  borderRadius: '12px !important',
                  mb: 2,
                  border: '1px solid rgba(100, 255, 218, 0.1)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  '&:before': { display: 'none' },
                  '&:hover': {
                    borderColor: 'rgba(100, 255, 218, 0.3)',
                    boxShadow: '0 8px 30px rgba(100, 255, 218, 0.2)',
                    transform: 'translateY(-2px)',
                    transition: 'all 0.3s ease'
                  }
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <motion.div
                      animate={{ rotate: expanded === `panel${index}` ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ExpandMoreIcon sx={{ color: '#64ffda' }} />
                    </motion.div>
                  }
                  sx={{
                    minHeight: '70px',
                    '& .MuiAccordionSummary-content': {
                      my: 1
                    }
                  }}
                >
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 600,
                      fontSize: { xs: '1rem', md: '1.1rem' }
                    }}
                  >
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                
                <AccordionDetails>
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: expanded === `panel${index}` ? 1 : 0,
                      height: expanded === `panel${index}` ? 'auto' : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Divider sx={{ mb: 2, bgcolor: 'rgba(100, 255, 218, 0.2)' }} />
                    <Typography
                      variant="body1"
                      sx={{
                        color: '#8892b0',
                        lineHeight: 1.7,
                        fontSize: { xs: '0.95rem', md: '1rem' }
                      }}
                    >
                      {faq.answer}
                    </Typography>
                  </motion.div>
                </AccordionDetails>
              </Accordion>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action avec animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{ textAlign: 'center', marginTop: '3rem' }}
        >
          <Typography
            variant="h6"
            sx={{
              color: '#ccd6f6',
              mb: 3,
              fontStyle: 'italic'
            }}
          >
            Vous avez une question qui n'est pas listée ici ?
          </Typography>
          
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Box
              component="a"
              href="#contact"
              sx={{
                display: 'inline-block',
                px: 4,
                py: 2,
                bgcolor: 'transparent',
                color: '#64ffda',
                border: '2px solid #64ffda',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 600,
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: 'rgba(100, 255, 218, 0.1)',
                  boxShadow: '0 0 20px rgba(100, 255, 218, 0.3)'
                }
              }}
            >
              Contactez-moi
            </Box>
          </motion.div>
        </motion.div>
      </Box>

      <SectionTransition />
    </Box>
  );
}