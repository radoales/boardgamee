import { useState } from "react"
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputChangeEventData,
  View,
} from "react-native"

interface PatitoInput {
  icon?: JSX.Element
  onChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void
}

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderRadius: 8,
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    paddingLeft: 5,
  },
  input: {
    height: 50,
    flex: 1,
    outlineStyle: "none",
    paddingLeft: "1%",
  },
  focused: {
    borderColor: "blue",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
})

const PatitoInput: React.FC<PatitoInput> = ({ icon, onChange }) => {
  const [isFocused, setIsFocused] = useState(false)
  return (
    <View style={[styles.inputContainer, isFocused && styles.focused]}>
      {icon}
      <TextInput
        style={styles.input}
        inlineImageLeft="search_icon"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={onChange}
      />
    </View>
  )
}

export default PatitoInput
