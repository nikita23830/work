import React from 'react'
import styled from 'styled-components'
import { Grid } from '@material-ui/core'

export const MessageBodyPlace = ({ chats, activeTab }) => (
    <>{chats[activeTab].msg.map(i => {
        let date = new Date(parseInt(i.date, 10))
        return (
          <Message toMe={Boolean(i.sender)} item xs={12} sm={12}>
            <MessageBody toMe={Boolean(i.sender)}>
              {i.text}
            </MessageBody>
            <MessageTime>
              {addZero(date.getDate())}.{addZero(date.getMonth()+1)}.{date.getFullYear()} {addZero(date.getHours())}:{addZero(date.getMinutes())}:{addZero(date.getSeconds())}
            </MessageTime>
          </Message>
        )
    })}</>
)

const MessageTime = styled.div`{
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 14px;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: #99A9BA;
  }`
  
  const MessageBody = styled.div`{
    background: ${p=>p.toMe ? 'linear-gradient(104.91deg, #0067DD 0.53%, #2285EE 96.46%), #FAFAFA' : '#FAFAFA'};
    border-radius: ${p=>p.toMe ? '16px 16px 0px 16px' : '16px 16px 16px 0px'};
    padding: 20px 24px 20px 24px;
    max-width: 500px;
    white-space: pre-wrap;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    font-feature-settings: 'pnum' on, 'lnum' on;
    color: ${p=>p.toMe ? '#FFFFFF' : '#072D57'};
    text-align: left;
  }`
  
  const Message = styled(Grid)` && {
    display: flex;
    flex-direction: column;
    align-items: ${p=>p.toMe ? 'flex-end' : 'flex-start'};
  }`

  export function addZero(n) {
    return String("00" + n).slice(-2);
  }