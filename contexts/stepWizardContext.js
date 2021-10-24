import * as React from 'react'

export const StepWizardContext = React.createContext()

export function useStepsWizard(){
  const context = React.useContext(StepWizardContext)
  if(!context){
    throw new Error('useStepsWizard must be used within a Wizard')
  }
  return React.useContext(StepWizardContext)
}