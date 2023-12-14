import React, { useEffect, useState } from 'react'
import { Card, Form, Input, Typography } from 'antd'

const { Paragraph } = Typography

interface FieldData {
  name: string
  value?: any
  touched?: boolean
  validating?: boolean
  errors?: string[]
}

interface CustomizedFormProps {
  onChange: (fields: FieldData[]) => void
  fields: FieldData[]
}

const CustomizedForm: React.FC<CustomizedFormProps> = ({ onChange, fields }) => (
  <Form
    name="global_state"
    layout="inline"
    fields={fields}
    onFieldsChange={(_, allFields) => {
      onChange(allFields)
    }}
  >
    <Form.Item
      name="configKey"
      label="Config Key"
      rules={[{ required: true, message: 'Config Key is required!' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="description"
      label="Description"
      style={{ width: 300 }}
      rules={[{ required: true, message: 'Description is required!' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="isEditable"
      label="Editable"
      rules={[{ required: true, message: 'Editable is required!' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="lastUpdateBy"
      label="Last Update By"
      rules={[{ required: true, message: 'Last Update By is required!' }]}
    >
      <Input />
    </Form.Item>
  </Form>
)

const template = `

    # Feature ON
    INSERT INTO system_config(config_key, config_value, description, is_editable, last_update_by)
    VALUES ('{configKey}', 'true', '{description}', {isEditable}, '{lastUpdateBy}')
    ON DUPLICATE KEY UPDATE config_value   = values(config_value),
                            description    = values(description),
                            is_editable    = values(is_editable),
                            last_update_by = values(last_update_by);

    # Feature OFF
    INSERT INTO system_config(config_key, config_value, description, is_editable, last_update_by)
    VALUES ('{configKey}', 'false', '{description}', {isEditable}, '{lastUpdateBy}')
    ON DUPLICATE KEY UPDATE config_value   = values(config_value),
                            description    = values(description),
                            is_editable    = values(is_editable),
                            last_update_by = values(last_update_by);
                        `

function Translations() {
  const [fields, setFields] = useState<FieldData[]>([{ name: '', value: '' }])
  const [sql, setSql] = useState<string>(template)
  useEffect(() => {
    onChangeFieldParagraph()
  }, [fields])
  function onChangeFieldParagraph() {
    let sqlTmp = template
    fields.forEach((field: any) => {
      const key = `{${field.name[0]}}`
      sqlTmp = sqlTmp.replaceAll(key, field.value ?? key)
    })
    setSql(sqlTmp)
  }

  return (
    <Card id='insert_translation' title="Insert Translation">
      <CustomizedForm
        fields={fields}
        onChange={(newFields) => {
          setFields(newFields)
        }}
      />
      <Paragraph style={{ maxWidth: 1440, marginTop: 24 }}>
        <pre className='p-[10px]'><code>
            {sql}    
        </code></pre>
      </Paragraph>
    </Card>
  )
}
export default Translations;
