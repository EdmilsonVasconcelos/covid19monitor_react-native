import React, { Component } from 'react';

import { PieChart } from 'react-native-svg-charts';

import Card from '../../components/card';
import api from '../../services';
import { Container, TitleDateTime, ViewPieChart, ViewSectionCard } from '../style';

import Moment from 'moment';
import 'moment/locale/pt-br';

import Spinner from 'react-native-loading-spinner-overlay';

class Details extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: `COVID19 - Detalhes de ${navigation.getParam('uf')}`,
            headerStyle: {
                backgroundColor: '#5cd277'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold'
            },
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            data: '',
            spinner: true
        };
    }


    async componentDidMount() {
        await api.get(`/brazil/uf/${this.props.navigation.getParam('uf')}`)
            .then(response => {
                const { data } = response;
                data.total = data.cases + data.deaths + data.suspects;
                this.setState({ data: data, spinner: false })
            })
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
                <TitleDateTime>Última atualização em: {Moment(this.state.data.datetime).format('DD/MM/YYYY HH:mm')}</TitleDateTime>
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
            </Container>
        )
    }
}

export default Details;