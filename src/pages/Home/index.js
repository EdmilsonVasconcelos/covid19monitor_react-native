import React, { Component } from 'react';

import Card from '../../components/card';
import Select from '../../components/select';
import api from '../../services';

import { Container, TitleDateTime, ViewPieChart, ViewSectionCard } from '../style';
import { navigationOptionsHome } from '../../utils'

import { PieChart } from 'react-native-svg-charts';
import Moment from 'moment';
import 'moment/locale/pt-br';

import Spinner from 'react-native-loading-spinner-overlay';

class Home extends Component {
    static navigationOptions = navigationOptionsHome;

    constructor(props) {
        super(props);
        this.state = {
            data: '',
            spinner: true
        };
    }

    async componentDidMount() {
        await api.get()
            .then(response => {
                const { data } = response;
                const return_service = data.data;
                const obj_state = this.mountObjectToState(return_service);
                this.setState({ data: obj_state, spinner: false })
            })
    }

    mountObjectToState(data) {
        let obj_data = {
            deaths: 0,
            cases: 0,
            refuses: 0,
            suspects: 0,
            date_atualization: data[0].datetime,
            states_with_disease: []
        };

        data.map(state => {
            obj_data.deaths += state.deaths,
                obj_data.cases += state.cases,
                obj_data.refuses += state.refuses,
                obj_data.suspects += state.suspects,
                obj_data.states_with_disease.push({
                    "label": state.state,
                    "value": state.uf
                })
        })

        obj_data.total = obj_data.deaths + obj_data.cases + obj_data.refuses + obj_data.suspects;

        return obj_data;
    }

    render() {
        const pieData = [
            {
                value: this.state.data.deaths,
                svg: {
                    fill: '#c70202'
                },
                key: 1
            },
            {
                value: this.state.data.suspects,
                svg: {
                    fill: '#4addf0'
                },
                key: 2
            },
            {
                value: this.state.data.cases,
                svg: {
                    fill: '#f28d0a'
                },
                key: 3
            },
        ];
        return (
            <Container>
                <Spinner visible={this.state.spinner} />
                <TitleDateTime>Última atualização em: {Moment(this.state.data.date_atualization).format('DD/MM/YYYY HH:mm')}</TitleDateTime>
                <ViewPieChart>
                    <PieChart style={{ width: 200, height: 200 }} data={pieData} />
                </ViewPieChart>

                <ViewSectionCard>
                    <Card title="Casos" text={this.state.data.cases} backgroundColor="#f28d0a"></Card>
                    <Card title="Óbitos" text={this.state.data.deaths} backgroundColor="#c70202"></Card>
                </ViewSectionCard>

                <ViewSectionCard>
                    <Card title="Suspeitos" text={this.state.data.suspects} backgroundColor="#4addf0"></Card>
                    <Card title="Total" text={this.state.data.total} backgroundColor="#808080"></Card>
                </ViewSectionCard>

                <Select placeholder="Escolha um estado para pesquisa" colorTextModal="#2ebd4f" items={this.state.data} navigation={this.props.navigation} />
            </Container>
        );
    };

}

export default Home;