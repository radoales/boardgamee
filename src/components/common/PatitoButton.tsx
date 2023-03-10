import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle
} from 'react-native'
import colors from '../../styles/colors'
import LoadingSpinner from './LoadingSpinner'

interface PatitoButton {
  icon?: JSX.Element
  style?: StyleProp<ViewStyle>
  title: string
  onPress: () => void
  type?: 'primary' | 'secondary' | 'danger'
  isLoading?: boolean
}

const PatitoButton: React.FC<PatitoButton> = ({
  icon,
  title,
  style,
  onPress,
  type = 'primary',
  isLoading
}) => {
  return (
    <Pressable
      disabled={isLoading}
      style={[
        styles.container,
        style,
        type === 'primary'
          ? styles.primaryBackground
          : type === 'secondary'
          ? styles.secondaryBackground
          : styles.dangerBackground,
        isLoading && styles.loading
      ]}
      onPress={onPress}
    >
      {isLoading ? (
        <LoadingSpinner color='white' size={30} />
      ) : (
        <>
          {icon && <View style={styles.icon}>{icon}</View>}
          <Text
            style={[
              styles.title,
              type === 'primary'
                ? styles.primiryTitleColor
                : styles.secondaryTitleColor
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
    height: 35,
    alignItems: 'center'
  },
  dangerBackground: {
    backgroundColor: colors.orange
  },
  primaryBackground: {
    backgroundColor: colors.blue[600]
  },
  secondaryBackground: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.blue[600]
  },
  icon: {
    paddingRight: 10
  },
  title: {
    fontSize: 18
  },
  primiryTitleColor: {
    color: colors.white
  },
  secondaryTitleColor: {
    color: colors.blue[600]
  },
  loading: {
    opacity: 0.7
  }
})
export default PatitoButton
