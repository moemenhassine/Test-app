import { StyleSheet, View, Switch } from 'react-native';

import { Collapsible } from '@/components/ui/collapsible';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useTheme } from '@/contexts/ThemeContext';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function TabTwoScreen() {
  const { currentTheme, toggleTheme } = useTheme();
  const tintColor = useThemeColor({}, 'tint');
  const borderColor = useThemeColor({}, 'icon');

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="checklist"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Fonctionnalités</ThemedText>
      </ThemedView>

      {/* Theme Toggle Switch */}
      <ThemedView style={[styles.themeToggleContainer, { borderColor }]}>
        <View style={styles.themeToggleContent}>
          <View style={styles.themeToggleLeft}>
            <IconSymbol
              name={currentTheme === 'dark' ? 'moon.fill' : 'sun.max.fill'}
              size={20}
              color={tintColor}
            />
            <ThemedText style={styles.themeToggleText}>
              {currentTheme === 'dark' ? 'Mode sombre' : 'Mode clair'}
            </ThemedText>
          </View>
          <Switch
            value={currentTheme === 'dark'}
            onValueChange={toggleTheme}
            trackColor={{ false: '#767577', true: tintColor }}
            thumbColor={currentTheme === 'dark' ? '#fff' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
          />
        </View>
      </ThemedView>

      <ThemedText>
        Découvrez toutes les fonctionnalités de cette application To-Do List.
      </ThemedText>

      <Collapsible title="📝 Gestion des tâches">
        <ThemedText>
          Créez, modifiez et supprimez vos tâches facilement. Chaque tâche peut avoir un{' '}
          <ThemedText type="defaultSemiBold">titre (obligatoire)</ThemedText> et une{' '}
          <ThemedText type="defaultSemiBold">description (optionnelle)</ThemedText>.
        </ThemedText>
        <ThemedText style={styles.featureItem}>
          • Ajouter une nouvelle tâche avec le formulaire en haut de l'écran
        </ThemedText>
        <ThemedText style={styles.featureItem}>
          • Modifier une tâche existante en cliquant sur le bouton "Edit"
        </ThemedText>
        <ThemedText style={styles.featureItem}>
          • Supprimer une tâche avec confirmation de sécurité
        </ThemedText>
      </Collapsible>

      <Collapsible title="✅ Marquer comme complété">
        <ThemedText>
          Suivez votre progression en marquant les tâches comme complétées. Les tâches complétées
          sont visuellement distinguées avec une opacité réduite et un texte barré.
        </ThemedText>
        <ThemedText style={styles.featureItem}>
          • Cliquez sur la case à cocher ou sur la tâche pour changer son statut
        </ThemedText>
        <ThemedText style={styles.featureItem}>
          • Les tâches complétées restent visibles mais sont atténuées
        </ThemedText>
        <ThemedText style={styles.featureItem}>
          • Compteur de tâches actives et total en haut de l'écran
        </ThemedText>
      </Collapsible>

      <Collapsible title="🔍 Recherche de tâches">
        <ThemedText>
          Trouvez rapidement vos tâches grâce à la barre de recherche. La recherche filtre les
          tâches par titre ou description en temps réel.
        </ThemedText>
        <ThemedText style={styles.featureItem}>
          • Recherche instantanée dans les titres et descriptions
        </ThemedText>
        <ThemedText style={styles.featureItem}>
          • La barre de recherche apparaît automatiquement quand vous avez des tâches
        </ThemedText>
        <ThemedText style={styles.featureItem}>
          • Affichage des résultats filtrés en temps réel
        </ThemedText>
      </Collapsible>

      <Collapsible title="💾 Stockage local">
        <ThemedText>
          Toutes vos tâches sont sauvegardées localement sur votre appareil grâce à{' '}
          <ThemedText type="defaultSemiBold">AsyncStorage</ThemedText>. Vos données sont
          persistantes et disponibles même après la fermeture de l'application.
        </ThemedText>
        <ThemedText style={styles.featureItem}>
          • Sauvegarde automatique à chaque modification
        </ThemedText>
        <ThemedText style={styles.featureItem}>
          • Chargement automatique au démarrage de l'application
        </ThemedText>
        <ThemedText style={styles.featureItem}>
          • Aucune connexion internet requise
        </ThemedText>
      </Collapsible>

      <Collapsible title="🎨 Interface utilisateur">
        <ThemedText>
          Une interface moderne et intuitive conçue pour une expérience utilisateur optimale.
        </ThemedText>
        <ThemedText style={styles.featureItem}>
          • Design minimaliste et épuré
        </ThemedText>
        <ThemedText style={styles.featureItem}>
          • Liste défilable pour gérer de nombreuses tâches
        </ThemedText>
        <ThemedText style={styles.featureItem}>
          • Cartes de tâches avec ombres et bordures arrondies
        </ThemedText>
        <ThemedText style={styles.featureItem}>
          • Espacement et typographie optimisés pour mobile
        </ThemedText>
        <ThemedText style={styles.featureItem}>
          • Protection SafeAreaView pour éviter les zones de sécurité
        </ThemedText>
      </Collapsible>

      <Collapsible title="🌓 Mode sombre">
        <ThemedText>
          L'application s'adapte automatiquement au thème de votre système (clair ou sombre) pour
          une expérience visuelle confortable à tout moment.
        </ThemedText>
        <ThemedText style={styles.featureItem}>
          • Détection automatique du thème système
        </ThemedText>
        <ThemedText style={styles.featureItem}>
          • Couleurs adaptées pour le mode clair et sombre
        </ThemedText>
        <ThemedText style={styles.featureItem}>
          • Transition fluide entre les modes
        </ThemedText>
      </Collapsible>

      <Collapsible title="✨ Animations">
        <ThemedText>
          Des animations fluides améliorent l'expérience utilisateur lors des interactions.
        </ThemedText>
        <ThemedText style={styles.featureItem}>
          • Animation de fade-in au chargement de l'application
        </ThemedText>
        <ThemedText style={styles.featureItem}>
          • Animation de suppression lors de la suppression d'une tâche
        </ThemedText>
        <ThemedText style={styles.featureItem}>
          • Transitions douces pour les interactions
        </ThemedText>
      </Collapsible>

      <Collapsible title="📱 Compatibilité">
        <ThemedText>
          L'application fonctionne sur toutes les plateformes prises en charge par Expo.
        </ThemedText>
        <ThemedText style={styles.featureItem}>
          • iOS (iPhone et iPad)
        </ThemedText>
        <ThemedText style={styles.featureItem}>
          • Android (téléphones et tablettes)
        </ThemedText>
        <ThemedText style={styles.featureItem}>
          • Web (navigateurs modernes)
        </ThemedText>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  themeToggleContainer: {
    marginBottom: 16,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  themeToggleContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  themeToggleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  themeToggleText: {
    fontSize: 16,
    fontWeight: '500',
  },
  featureItem: {
    marginTop: 8,
    marginLeft: 8,
  },
});
