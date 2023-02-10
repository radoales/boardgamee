import { useState } from 'react'
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  TextStyle,
  View
} from 'react-native'
import colors from '../../styles/colors'

interface PatitoInput {
  icon?: JSX.Element
  // eslint-disable-next-line no-unused-vars
  onChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void
  placeholder?: string
  style?: StyleProp<TextStyle>
  value?: string
  error?: string | null
  type?: KeyboardTypeOptions | undefined
  isPassword?: boolean
}

const styles = StyleSheet.create({
  patitoInput: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column'
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 25,
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingLeft: 10,
    borderColor: colors.blue[200],
    overflow: 'hidden'
  },
  input: {
    height: 45,
    flex: 1,
    outlineStyle: 'none',
    paddingLeft: '1%'
  },
  focused: {
    borderColor: colors.blue[500],
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3
  },
  error: {
    color: colors.orange,
    paddingLeft: 15
  },
  icon: {
    paddingRight: 10
  }
})

const PatitoInput: React.FC<PatitoInput> = ({
  icon,
  onChange,
  placeholder,
  style,
  value,
  error,
  type,
  isPassword
}) => {
  const [isFocused, setIsFocused] = useState(false)
  return (
    <View style={[styles.patitoInput, style]}>
      <View style={[styles.inputContainer, isFocused && styles.focused]}>
        <View style={styles.icon}>{icon}</View>
        <TextInput
          style={styles.input}
          inlineImageLeft='search_icon'
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={onChange}
          placeholder={placeholder}
          value={value}
          keyboardType={type}
          secureTextEntry={isPassword}
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  )
}

export default PatitoInput
