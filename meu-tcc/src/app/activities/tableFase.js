import { Card, Collapse, Tag } from 'antd';

const text = (
    <p style={{ paddingLeft: 24 }}>
        A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found
        as a welcome guest in many households across the world.
    </p>
);

export default function TableFase() {
    const onChange = (key) => {
        console.log(key);
    };

    return (
        <>
            <Card
                title="Fase atual"
                bordered={false}
                style={{
                    width: 990,
                }}
            >
                <Tag color="#f50">Projeto Informacional</Tag>
                <h2>Fase 2</h2>
                <Collapse
                    size="small"
                    style={{ width: 950 }}
                    items={[
                        {
                            key: '1',
                            label: 'Descrição',
                            children: <p>{text}</p>,
                        },
                    ]}
                />
            </Card>
        </>
    );
};