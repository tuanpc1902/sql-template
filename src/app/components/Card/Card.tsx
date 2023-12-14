import { Card } from "antd";

type CardTemplateProps = {
    title: string;
    children: React.ReactNode;
};

function CardTemplate({title, children}: CardTemplateProps){
    return (
        <Card title={title}>
            {children}
        </Card>
    )
}
export default CardTemplate;