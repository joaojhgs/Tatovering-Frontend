import React, { useEffect, useState, useContext, useMemo, useCallback } from 'react';
import { Card, Col, Modal, Descriptions, Row } from 'antd';
import PageLayout from './layout/pageLayout';
import useRequest from '../../hooks/useRequest';
import AgendamentosController from '../../structures/controllers/AgendamentosController';
import { UserContext } from '../../pages/dashboardPage';

import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import "react-big-calendar/lib/css/react-big-calendar.css";
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

const DnDCalendar = withDragAndDrop(Calendar)

const localizer = momentLocalizer(moment);

export default function Schedulle() {
    const user = useContext(UserContext);
    const [schedullesAndServices, setSchedullesAndServices] = useState([]);
    const [serviceDetailsModal, setServiceDetailsModal] = useState(null)
    const [getAgendamentos, loadingAgendamentos, hasErrorAgendamentos] =
        useRequest(AgendamentosController.getAgendamentos);
    const events = useMemo(() => schedullesAndServices?.agendamento?.map(e => ({ start: new Date(e.data_inicio), end: new Date(e.data_termino), title: e.observacao, servico_id: e.servico_id })) ?? [], [schedullesAndServices])
    // Todo: add images
    const ServiceDescriptionComponent = useCallback(() => {
        if (!serviceDetailsModal) return <></>
        const service = schedullesAndServices.servico.find(e => e.id === serviceDetailsModal)
        return <Descriptions title="User Info">
            <Descriptions.Item label="Tipo">{service.tipo}</Descriptions.Item>
            <Descriptions.Item label="Objetivo">{service.objetivo}</Descriptions.Item>
            <Descriptions.Item label="Descricao">{service.descricao}</Descriptions.Item>
            <Descriptions.Item label="Sessões">{service.qtde_sessoes}</Descriptions.Item>
            <Descriptions.Item label="Valor">
                R$ {service.valor}
            </Descriptions.Item>
        </Descriptions>
    }, [serviceDetailsModal])

    useEffect(() => {
        if (user) {
            getAgendamentos(!!user?.tatuador_id)
                .then((response) => {
                    console.log('response', response);
                    setSchedullesAndServices(response);
                })
                .catch((e) => { console.log(e) });
        }
    }, [user])

    return (
        <PageLayout
            title="Agendamentos"
            subtitle="Detalhes e datas sobre agendamentos"
        >
            <Row gutter={[24, 24]}>
                <Col span={24}>
                    <Card>
                        <DnDCalendar
                            localizer={localizer}
                            defaultDate={new Date()}
                            defaultView="week"
                            events={events}
                            style={{ height: "100vh" }}
                            selectable
                            popup
                            draggable
                            resizable
                            timeslots={4}
                            steps={15}
                            onSelectEvent={e => { setServiceDetailsModal(e.servico_id) }} // Click event (show details)
                            onSelectSlot={(e => { console.log('onSelectSlot', e) })} // Select time to schedulle
                            onEventDrop={(e => { console.log('onEventDrop', e) })} // Drag and drop
                            onEventResize={(e => { console.log('onEventResize', e) })} // Resize event time
                        />
                    </Card>
                </Col>
            </Row>
            <Modal open={serviceDetailsModal} onCancel={() => setServiceDetailsModal(null)} footer={null}>
                <ServiceDescriptionComponent />
            </Modal>
        </PageLayout>
    );
}
