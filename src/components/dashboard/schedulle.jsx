import React, { useEffect, useState, useContext, useMemo } from 'react';

import { Card, Col, Row } from 'antd';

import PageLayout from './layout/pageLayout';

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";
import useRequest from '../../hooks/useRequest';
import AgendamentosController from '../../structures/controllers/AgendamentosController';
import { UserContext } from '../../pages/dashboardPage';

const localizer = momentLocalizer(moment);

export default function Schedulle() {
    const user = useContext(UserContext);
    const [agendamentos, setAgendamentos] = useState([]);
    const [getAgendamentos, loadingAgendamentos, hasErrorAgendamentos] =
        useRequest(AgendamentosController.getAgendamentos);
    useEffect(() => {
        if(user){
            getAgendamentos(!!user?.tatuador_id)
                .then((response) => { console.log(response); setAgendamentos(response) })
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
                        <Calendar
                            localizer={localizer}
                            defaultDate={new Date()}
                            defaultView="month"
                            events={agendamentos?.map(e => ({start: new Date(e.data_inicio), end: new Date(e.data_termino), title: e.observacao})) ?? []}
                            style={{ height: "100vh" }}
                            selectable
                            timeslots={4}
                            steps={15}
                            onSelectEvent={(e => { console.log('onSelectEvent', e) })} // Click event (show details)
                            onSelectSlot={(e => { console.log('onSelectSlot', e) })} // Select time to schedulle
                            onEventDrop={(e => { console.log('onEventDrop', e) })} // Drag and drop
                            onEventResize={(e => { console.log('onEventResize', e) })} // Resize event time
                        />
                    </Card>
                </Col>
            </Row>

        </PageLayout>
    );
}
