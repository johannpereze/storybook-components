import { ComponentMeta, ComponentStory } from '@storybook/react'
import Select from '../../components/select/Select'

export default {
  title: 'UI/Select',
  component: Select
} as ComponentMeta<typeof Select>

const Template: ComponentStory<typeof Select> = args => <Select {...args} />
export const Outlined = Template.bind({})
export const Filled = Template.bind({})
Filled.args = {
  variant: 'filled'
}
export const Standard = Template.bind({})
Standard.args = {
  variant: 'standard'
}
