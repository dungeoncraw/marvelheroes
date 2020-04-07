import React from 'react';
import { HeroInfo } from '../communication/store/heroes/types';

type PropsFromParent = {
    hero?: HeroInfo
};

type Props = PropsFromParent;

const HeroDetail = React.memo((props: Props) => {

    console.log(props.hero);
    return(<></>);

});

export default HeroDetail;