import { Space } from "antd";
import FlagFeature from "../FlagFeature/FlagFeature";
import Translations from "../Translations/Translations";

function SqlTemplate(){
    return (
        <Space direction="vertical" size={50} className="flex">
            <FlagFeature />
            <Translations />
        </Space>
        
    )
}
export default SqlTemplate;