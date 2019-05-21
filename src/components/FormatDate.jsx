import React from 'react';
import Moment from 'react-moment';

const FormatDate = props => {
  const { dateToFormat } = props;
  return <Moment format="YYYY/MM/DD hh:mm">{dateToFormat}</Moment >;
}

export default FormatDate;