import React, { Component } from 'react';
import { CTLParser } from './../core/CTLParser';
import './RCLHtmlView.scss';

export default class RCLHtmlView extends Component {
    state = { jsxCode: [] };

    componentDidMount() {
        const { code } = this.props;

        const parser = new CTLParser(this);
        this.setState({ jsxCode: parser.parse(code) });
    }

    render() {
        return (
            <div id={'code_view'} className={'ctl-view'}>
                {this.state.jsxCode}
            </div>
        );
    }

    onLinkClicked = (id, type) => {
        this.props.onLinkClicked(id, type);
    };
}
