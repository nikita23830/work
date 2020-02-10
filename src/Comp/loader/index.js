import React from 'react'
import styled from 'styled-components'
import { Skeleton } from '@material-ui/lab'

class Loader extends React.Component {

    render () {
        return (
            <Root>
                <SkeletonLogo />
                <SkeletonPageName />
                <SkeletonSearch />
                <SkeletonLk variant="circle" />
                <SkeletonNotif variant="circle" />
                <SkeletonPost variant="circle" />
                <SkeletonMenu top={90} />
                <SkeletonMenu top={140} />
                <SkeletonMenu top={190} />
                <SkeletonMenu top={240} />
                <SkeletonNews top={80} />
                <SkeletonNews top={308} />
                <SkeletonNotification />
            </Root>
        )
    }
}

export default Loader

const Root = styled.div`{
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: ${document.documentElement.clientHeight}px;
}`

const SkeletonNotification = styled(Skeleton)` && {
    position: absolute;
    width: ${document.documentElement.clientWidth - 956}px;
    height: ${document.documentElement.clientHeight - 90}px;
    left: 946px;
    top: 80px;
    margin: 0px;
}`

const SkeletonNews = styled(Skeleton)` && {
    position: absolute;
    top: ${p=>p.top}px;
    left: 276px;
    width: 658px;
    height: 216px;
    margin: 0px;
}`

const SkeletonLk = styled(Skeleton)` && {
    position: absolute;
    margin: 0px;
    top: 12px;
    right: 24px;
    width: 40px;
    height: 40px;
}`

const SkeletonPost = styled(Skeleton)` && {
    position: absolute;
    margin: 0px;
    top: 12px;
    right: 120px;
    width: 40px;
    height: 40px;
}`

const SkeletonNotif = styled(Skeleton)` && {
    position: absolute;
    margin: 0px;
    top: 21px;
    right: 81px;
    width: 22px;
    height: 22px;
}`

const SkeletonSearch = styled(Skeleton)` && {
    position: absolute;
    margin: 0px;
    top: 5px;
    height: 54px;
    left: 580px;
    width: ${document.documentElement.clientWidth - 764}px;
}`

const SkeletonPageName = styled(Skeleton)` && {
    position: absolute;
    top: 5px;
    height: 54px;
    left: 270px;
    width: 300px;
    margin: 0px;
}`

const SkeletonMenu = styled(Skeleton)` && {
    position: absolute;
    top: ${p=>p.top}px;
    left: 10px;
    height: 30px;
    width: 240px;
    margin: 0px;
}`

const SkeletonLogo = styled(Skeleton)` && {
    position: absolute;
    top: 0px;
    left: 0px;
    height: 64px;
    width: 260px;
    margin: 0px;
    border-radius: 0px;
}`