import { Modal, Calendar, Button, Steps } from "antd";
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import moment from 'moment';
import dayjs from 'dayjs'
import useRequest from "../../hooks/useRequest";
import AgendamentosController from "../../structures/controllers/AgendamentosController";

interface Data {
    tatuagem_id?: string;
    tatuagem_url?: string;
    tatuador_id: string;
}
interface SchedulleModalParams {
    data: Data | null,
    setData: Dispatch<SetStateAction<Data | null>>
}

interface DateIntervalProps {
    interval: number;
    start: Date;
    end: Date;
    setSelectedSchedulledTime: (time: any) => void;
    data?: {
        agendamentos: {
            duracao: number;
            data_inicio: string;
            data_termino: string;
        }[];
        estudio: {
            id: string;
            nome: string;
            // ... (other properties)
            horario_funcionamento: {
                segunda: [string, string];
                terca: [string, string];
                quarta: [string, string];
                quinta: [string, string];
                sexta: [string, string];
                sabado: [string, string] | null;
                domingo: [string, string] | null;
            };
            dias_funcionamento: {
                segunda: boolean;
                terca: boolean;
                quarta: boolean;
                quinta: boolean;
                sexta: boolean;
                sabado: boolean;
                domingo: boolean;
            };
        };
    };
}

const DateIntervalComponent: React.FC<DateIntervalProps> = ({ interval, start, end, data, setSelectedSchedulledTime }) => {
    const [dateList, setDateList] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs());
    const englishToPortugueseDays: { [key: string]: string } = {
        monday: 'segunda',
        tuesday: 'terca',
        wednesday: 'quarta',
        thursday: 'quinta',
        friday: 'sexta',
        saturday: 'sabado',
        sunday: 'domingo',
    };
    const generateDateList = () => {
        if (!data) {
            setDateList([]);
            return;
        }
        const selectedDayOfWeek = englishToPortugueseDays[selectedDate.format('dddd').toLowerCase()];
        const horarioFuncionamento = data.estudio.horario_funcionamento[selectedDayOfWeek];

        if (horarioFuncionamento) {
            const startTime = moment(`${selectedDate.format('YYYY-MM-DD')} ${horarioFuncionamento[0]}`, 'YYYY-MM-DD HH:mm');
            const endTime = moment(`${selectedDate.format('YYYY-MM-DD')} ${horarioFuncionamento[1]}`, 'YYYY-MM-DD HH:mm');

            const intervals: string[] = [];

            while (startTime.isBefore(endTime)) {
                const intervalStartTime = startTime.format('HH:mm');
                const intervalEndTime = startTime.add(interval, 'minutes').format('HH:mm');

                const isConflict = data.agendamentos.some((agendamento) => {
                    const agendamentoStart = moment(agendamento.data_inicio);
                    const agendamentoEnd = moment(agendamento.data_termino);
                    console.log(agendamentoStart, agendamentoEnd)

                    return (
                        (agendamentoStart.isSameOrBefore(intervalStartTime) && agendamentoEnd.isSameOrAfter(intervalStartTime)) ||
                        (agendamentoStart.isSameOrAfter(intervalStartTime) && agendamentoStart.isBefore(intervalEndTime))
                    );
                });

                if (!isConflict) {
                    intervals.push(intervalStartTime);
                }
            }

            // Add the end time to the list
            intervals.push(endTime.format('HH:mm'));

            setDateList(intervals);
        } else {
            setDateList([]);
        }
    };
    useEffect(() => {
        generateDateList();
    }, [interval, start, end, data, selectedDate]);

    const handleDateChange = (value: moment.Moment) => {
        setSelectedDate(value);
    };

    const dateFullCellRender = (date: moment.Moment) => {
        const dayOfWeek = englishToPortugueseDays[date.format('dddd').toLowerCase()];
        const hasHorarioFuncionamento =
            data?.estudio.dias_funcionamento[dayOfWeek] && data?.estudio.horario_funcionamento[dayOfWeek];

        const isSelected = selectedDate ? selectedDate.isSame(date, 'day') : false;

        const cellStyle: React.CSSProperties = {
            textAlign: 'center',
            marginTop: '8px',
            color: hasHorarioFuncionamento ? (isSelected ? 'white' : 'inherit') : 'rgba(0, 0, 0, 0.25)',
            backgroundColor: isSelected ? 'blue' : 'transparent',
            cursor: hasHorarioFuncionamento ? 'pointer' : 'not-allowed',
        };


        const handleClick = (e) => {
            if (hasHorarioFuncionamento) {
                setSelectedDate(date);
            } else {
                e.preventDefault()
                e.stopPropagation()
            }
        };

        return (
            <div style={cellStyle} onClick={handleClick}>
                {date.format('D')}
            </div>
        );
    };

    return (
        <div>
            <h2>Horários vagos</h2>
            <div className="flex">
                <Calendar className="w-[70%]" defaultValue={dayjs(new Date())} fullscreen={false} onChange={handleDateChange} dateFullCellRender={dateFullCellRender} headerRender={() => <></>} />
                <ul className="max-h-[300px] overflow-y-scroll w-[30%]">
                    {dateList.map((date, index) => (
                        <Button type="primary" block key={index} className="w-full my-2" onClick={() => {
                            const schedulledDateHour = selectedDate.set('hours', Number(date.split(':')[0]))
                            const schedulledDateMinutes = schedulledDateHour.set('minutes', Number(date.split(':')[1]))
                            console.log(schedulledDateMinutes)
                            setSelectedSchedulledTime(schedulledDateMinutes)
                        }}>
                            {date}
                        </Button>
                    ))}
                </ul>
            </div>
        </div>
    );
};


const ScheduleModal = ({
    data, setData
}: SchedulleModalParams) => {
    const [getAvailability, loadingAvailability] =
        useRequest(AgendamentosController.getAvailability);
    const [createAgendamento] = useRequest(AgendamentosController.createAgendamento)
    const [unavailableSchedulles, setUnavailableSchedulles] = useState()
    const [step, setStep] = useState(0)
    const [selectedSchedulledTime, setSelectedSchedulledTime] = useState<moment.Moment>()

    useEffect(() => {
        if (selectedSchedulledTime) {
            console.log('asdas', selectedSchedulledTime.toISOString())
            submit(selectedSchedulledTime, unavailableSchedulles?.estudio.id)
            setData(null)
        }
    }, [selectedSchedulledTime])

    useEffect(() => {
        if (data) {
            getAvailability(data?.tatuador_id)
                .then((response) => {
                    console.log('response', response);
                    setUnavailableSchedulles(response);
                })
                .catch((e) => { console.log(e) });
        }
    }, [data])

    interface Agendamento {
        estudio_id: string;
        tatuador_id: string;
        duracao: number;
        status: string;
        observacao: string;
        data_inicio: string;
        data_termino: string;
    }

    interface Servico {
        estudio_id: string;
        tatuagem_id: string;
        tatuador_id: string;
        tipo: string;
        descricao: string | null;
        valor: number;
        qtde_sessoes: number;
        imagem_referencia: string | null;
        imagem_referencia2: string | null;
        objetivo: string;
        imagem_referencia3: string | null;
    }

    interface AgendamentoServico {
        agendamento: Agendamento;
        servico: Servico;
    }


    const submit = (time, estudio_id) => {
        let params: AgendamentoServico;
        params = {
            agendamento: {
                tatuador_id: data?.tatuador_id ?? '',
                estudio_id: estudio_id,
                data_inicio: time,
                data_termino: time.add(30, 'minutes'),
                duracao: 30,
                status: 'AGENDADO',
                observacao: ''
            },
            servico: {
                descricao: null,
                estudio_id: estudio_id,
                tatuador_id: data?.tatuador_id ?? '',
                tatuagem_id: data?.tatuagem_id ?? '',
                qtde_sessoes: 1,
                tipo: 'PEQUENA',
                valor: 400,
                imagem_referencia: null,
                imagem_referencia2: null,
                imagem_referencia3: null,
                objetivo: "SESSAO",
            }
        }
        createAgendamento(params).then(e => { console.log('success') }).catch((e) => console.log(e))
    }

    return (
        <>
            <Modal title="Agende sua sessão" width={840} footer={null} open={!!data} onCancel={() => { setData(null) }}>
                <DateIntervalComponent start={new Date()} end={new Date(new Date().setHours(23))} interval={30} data={unavailableSchedulles} setSelectedSchedulledTime={setSelectedSchedulledTime} />
            </Modal>
        </>
    )
}

export default ScheduleModal;