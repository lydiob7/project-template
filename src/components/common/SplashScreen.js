import { memo } from 'react';
import { useSelector } from 'react-redux';

import { parsePath } from 'utils/helpers';

function SplashScreen() {
    const appInformation = useSelector(({ ui }) => ui.appInformation);

    return (
        <div id="fuse-splash-screen">
            <div className="center">
                <div className="logo">
                    <img width="128" src={parsePath(appInformation?.appLogo)} alt="logo" />
                </div>
                <div className="spinner-wrapper">
                    <div className="spinner">
                        <div className="inner">
                            <div className="gap" />
                            <div className="left">
                                <div className="half-circle" />
                            </div>
                            <div className="right">
                                <div className="half-circle" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(SplashScreen);
