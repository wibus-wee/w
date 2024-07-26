interface InjectProps {
  [key: string]: {
    value: any // The value to inject.
    type?: 'const' | 'let' | 'var' // The type of the injected code.
    place?: 'before' | 'after' // Where to place the injected code.
    newline?: boolean // Whether to add a newline after the injected code.
  } | any
}

/**
 * Injects the given props into code.(Before the code is transpiled)
 * @param {InjectProps} props - The props to inject.
 */
export function rollupPluginInject(props: InjectProps) {
  return {
    name: 'injectCodeProps',
    transform(code: any) {
      const propsEntries = Object.entries(props)
      if (propsEntries.length === 0)
        return code
      
      const lines = code.split('\n')
      const newLines: string[] = []
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        newLines.push(line)
        for (const [key, value] of propsEntries) {
          const prop = props[key]
          const { type = 'const', place = 'before', newline = true } = prop
          if (line.includes(key)) {
            if (place === 'before') {
              newLines.splice(newLines.length - 1, 0, `${type} ${key} = ${JSON.stringify(value)};`)
            } else {
              newLines.splice(newLines.length, 0, `${type} ${key} = ${JSON.stringify(value)};`)
            }
            if (newline) {
              newLines.splice(newLines.length, 0, '')
            }
          }
        }
      }
      return newLines.join('\n')
    },
  }
}
