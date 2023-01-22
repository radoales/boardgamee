import { useState } from 'react'
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  View
} from 'react-native'
import colors from '../styles/colors'

interface PatitoInput {
  icon?: JSX.Element
  onChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void
  placeholder?: string
  style?: {}
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
    borderColor: colors.gray[700]
  },
  input: {
    height: 45,
    flex: 1,
    outlineStyle: 'none',
    paddingLeft: '1%'
  },
  focused: {
    borderColor: 'blue',
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3
  },
  error: {
    color: colors.orange,
    paddingLeft: 15
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
        {icon}
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
