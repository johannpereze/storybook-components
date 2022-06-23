import { ComponentMeta, ComponentStory } from '@storybook/react'
import TextField from '../../components/textField/TextField'

export default {
  title: 'UI/TextField',
  component: TextField
} as ComponentMeta<typeof TextField>

const Template: ComponentStory<typeof TextField> = args => <TextField {...args} />
export const Default = Template.bind({})
