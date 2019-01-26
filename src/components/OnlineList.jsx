import React from 'react';
import {
    Cells,
    CellsTitle,
    Cell,
    CellBody,
    CellFooter,
} from 'react-weui';
import 'weui';
import 'react-weui/build/packages/react-weui.css';
const OnlineList = (props) => (
    <div id="OnlineList">
        <CellsTitle>List with link</CellsTitle>
        <Cells>
            <Cell href="javascript:;" access>
                <CellBody>
                    Title
                </CellBody>
                <CellFooter/>
            </Cell>
            <Cell access>
                <CellBody>
                    Title
                </CellBody>
                <CellFooter/>
            </Cell>
        </Cells>
    </div>
);

export default OnlineList;