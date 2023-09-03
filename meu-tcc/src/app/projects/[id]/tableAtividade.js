import { Card, Collapse, Tag } from 'antd';

const text = (
    <p style={{ paddingLeft: 24 }}>
        A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found
        as a welcome guest in many households across the world.
    </p>
);

export default function TableAtividade() {
    const onChange = (key) => {
        console.log(key);
    };

    return (
        <>
            <Card
                title="Atividade atual"
                bordered={false}
                // style={{
                //     width: 990,
                // }}
            >
                <Tag color="#f50">Projeto Informacional</Tag>
                <h2>Atividade de tal projeto</h2>
                <Collapse
                    size="small"
                    // style={{ width: 950 }}
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