
import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NotificationButton from '../NotificationsButton';
import { BASE_URL } from "../../utils/request";
import { Sale } from "../../models/sales";
import './styles.css';


function SalesCard() {

    const min = new Date(new Date().setDate(new Date().getDate() - 365));//processa a data atual com um ano atras
    const max = new Date();
    //  const date = new Date(new Date().setDate(new Date().getDate() - 365));
    const [minDate, setMinDate] = useState(new Date(min));
    const [maxDate, setMaxDate] = useState(new Date(max));
    //setMaxDate altera o valor de MinDate ou MaxDate
    const [sales, setSales] = useState<Sale[]>([]);

    useEffect(() => {
        const dmin = minDate.toISOString().slice(0,10);
        const dmax = maxDate.toISOString().slice(0,10);

        axios.get(`${BASE_URL}/sales?minDate=${dmin}&maxDate=${dmax}`)
            .then(response => { setSales(response.data.content) })
            }, [minDate,maxDate]);//toda vez que a data for mudada sera mudado os valores de minDate e maxDate assim useEffect atualizarar os dados da tabela

    return (
        <div className="dsmeta-card">
            <h2 className="dsmeta-sales-title">Vendas</h2>
            <div>
                <div className="dsmeta-form-control-container">
                    <DatePicker
                        selected={minDate}
                        onChange={(date: Date) => setMinDate(date)}
                        className="dsmeta-form-control"
                        dateFormat="dd/MM/yyyy"
                    />
                </div>
                <div className="dsmeta-form-control-container">
                    <DatePicker selected={maxDate}
                        onChange={(date: Date) => setMaxDate(date)} //usa a função seMaxdate( recebendo date e onde retorna o valor selecionando preenchendo o campo data do form)
                        className="dsmeta-form-control"
                        dateFormat="dd/MM/yyyy"
                    />
                </div>
            </div>

            <div>
                <table className="dsmeta-sales-table">
                    <thead>
                        <tr>
                            <th className="show992">ID</th>
                            <th className="show576">Data</th>
                            <th>Vendedor</th>
                            <th className="show992">Visitas</th>
                            <th className="show992">Vendas</th>
                            <th>Total</th>
                            <th>Notificar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map(sale => {//.map percorre a lista e executa uma operação
                            return(
                                    <tr key={sale.id}>
                                        <td className="show992">{sale.id}</td>
                                        <td className="show576">{new Date(sale.date).toLocaleDateString()}</td>
                                        <td>{sale.sellerName}</td>
                                        <td className="show992">{sale.visited}</td>
                                        <td className="show992">{sale.deals}</td>
                                        <td>R$ {sale.amount.toFixed(2)}</td>
                                        <td>
                                            <div className="dsmeta-red-btn-container">
                                                <div className="dsmeta-red-btn">
                                                    <NotificationButton saleId={sale.id} />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )
                        })}
                    </tbody>

                </table>
            </div>
        </div>
    )
}
export default SalesCard;