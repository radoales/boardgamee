import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle
} from 'react-native'
import colors from '../../styles/colors'

interface PatitoButton {
  icon?: JSX.Element
  style?: StyleProp<ViewStyle>
  title: string
  onPress: () => void
  type?: 'primary' | 'secondary' | 'danger'
}

const PatitoButton: React.FC<PatitoButton> = ({
  icon,
  title,
  style,
  onPress,
  type = 'primary'
}) => {
  return (
    <Pressable
      style={[
        styles.container,
        style,
        type === 'primary'
          ? styles.primaryBackground
          : type === 'secondary'
          ? styles.secondaryBackground
          : styles.dangerBackground
      ]}
      onPress={onPress}
    >
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
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
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
  }
})
export default PatitoButton
