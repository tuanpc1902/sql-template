import React, { useEffect, useMemo, useState } from 'react'
import { Card, Col, Form, Input, Row, Space, Typography } from 'antd'
import Copy from '../Copy/Copy'
import FileName from '../FileName/FileName'
import './styles.css'

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
    name="flag-feature"
    labelCol={{ span: 3 }}
    wrapperCol={{ span: 9 }}
    layout="horizontal"
    fields={fields}
    onFieldsChange={(_, allFields) => {
      onChange(allFields)
    }}
  >
    <Form.Item
      name="issueKey"
      label="Issue Key"
      rules={[
        { required: true, message: 'Issue Key is required!' },
        {
          pattern: /^PSD-\d+/,
          message: 'The code must start with "PSD-" followed by numbers',
        },
      ]}
    >
      <Input />
    </Form.Item>
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
      rules={[{ required: true, message: 'Description is required!' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="isEditable"
      label="Editable"
      rules={[
        { required: true, message: 'Editable is required!' },
        { pattern: /^(1|0)$/, message: 'Editable must be 1 or 0' },
      ]}
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
    VALUES ('{{configKey}}', 'true', '{{description}}', {{isEditable}}, '{{lastUpdateBy}}')
    ON DUPLICATE KEY UPDATE config_value   = values(config_value),
                            description    = values(description),
                            is_editable    = values(is_editable),
                            last_update_by = values(last_update_by);

    # Feature OFF
    INSERT INTO system_config(config_key, config_value, description, is_editable, last_update_by)
    VALUES ('{{configKey}}', 'false', '{{description}}', {{isEditable}}, '{{lastUpdateBy}}')
    ON DUPLICATE KEY UPDATE config_value   = values(config_value),
                            description    = values(description),
                            is_editable    = values(is_editable),
                            last_update_by = values(last_update_by);
`

function FlagFeature() {
  const [fields, setFields] = useState<FieldData[]>([{ name: '', value: '' }])
  const [sql, setSql] = useState<string>(template)
  const [sqlFormat, setSqlFormat] = useState<string>(template)
  const [issueKey, setIssueKey] = useState<string>('{{issueKey}}')

//   useEffect(() => {
//     onChangeFieldParagraph()
//   }, [fields, sql]);

  const sqlFormatTmp = useMemo(() => {
    let sqlTmp = template;
    let sqlFormatTmp = template;
    fields.forEach((field: any) => {
      const key = field.name[0]
      if (key === 'issueKey') setIssueKey(field.value);
      sqlTmp = sqlTmp.replaceAll(`{{${key}}}`, field.value ?? `{{${key}}}`);
      sqlFormatTmp = sqlFormatTmp.replaceAll(
        `{{${key}}}`,
        field.value ? `<mark>${field.value}</mark>` : `<mark>{{${key}}}</mark>`,
      );
    })
    setSql(sqlTmp)
    setSqlFormat(sqlFormatTmp)
    return sqlFormatTmp;
  }, [fields]);

//   function onChangeFieldParagraph() {
//     let sqlTmp = template;
//     let sqlFormatTmp = template;
//     fields.forEach((field: any) => {
//       const key = field.name[0]
//       if (key === 'issueKey') setIssueKey(field.value);
//       sqlTmp = sqlTmp.replaceAll(`{{${key}}}`, field.value ?? `{{${key}}}`);
//       sqlFormatTmp = sqlFormatTmp.replaceAll(
//         `{{${key}}}`,
//         field.value ? `<mark>${field.value}</mark>` : `<mark>{{${key}}}</mark>`,
//       );
//     })
//     setSql(sqlTmp)
//     setSqlFormat(sqlFormatTmp)
//   }
  console.log('render'  + sqlFormatTmp)
  return (
    <Card id="flag_feature" title="Flag Feature">
      <CustomizedForm
        fields={fields}
        onChange={(newFields) => {
          setFields(newFields)
        }}
      />
      <Paragraph style={{ maxWidth: 1440, marginTop: 24 }}>
        <pre className="p-[10px] relative">
          <code dangerouslySetInnerHTML={{ __html: sqlFormatTmp }}></code>
          <FileName name={`${issueKey}_flag_feature_config.sql`} />
          <Copy content={sql} />
        </pre>
      </Paragraph>
    </Card>
  )
}
export default FlagFeature
