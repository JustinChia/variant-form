import {buildClassAttr, buildContainerWidget, buildFieldWidget} from '@/utils/sfc-generator'

export const templateGenerator = function(fw, formConfig) {
  const wop = fw.options
  const typeAttr = `type=${wop.type}`  
  const buttonCircle = wop.circle?`shape="${wop.circle}"`:""
  const buttonIcon= `icon=${wop.icon}`
  const disabled=`disabled=${wop.disabled}`
  

  const template=`<Button ${typeAttr}  ${buttonCircle} ${buttonIcon} ${disabled}>${wop.label}</Button>`

  return template
}
