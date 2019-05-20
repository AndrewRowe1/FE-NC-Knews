import React, { Component } from 'react';
import Moment from 'react-moment';

class FormatDate extends Component {
  render () {
    const { dateToFormat } = this.props;
    return (
      <Moment format="YYYY/MM/DD hh:mm">{dateToFormat}</Moment >
    );
  }
}

export default FormatDate;