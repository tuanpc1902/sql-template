import { Menu } from "antd";
import { Header } from "antd/es/layout/layout";

const items = [
    {
      key: 'flag_feature',
      label: <a className="navbar" href="#flag_feature">Flag Feature</a>,
    },
    {
        key: 'insert_translation',
        label: <a className="navbar" href="#insert_translation">Insert Translation</a>,
      },
  ];

function HeaderLayout(){
    return (
    <Header className="sticky top-0 z-50 mb-[3rem]">
        <Menu
        mode="horizontal"
        theme="dark"
        defaultSelectedKeys={['flag_feature']}
        items={items}
        className="bg-[rgba(0, 0, 0, 0.88)] text-white font-semibold"
        style={{ 
            flex: 1, 
            minWidth: 0
         }}
        />
    </Header>
    )
}
export default HeaderLayout;