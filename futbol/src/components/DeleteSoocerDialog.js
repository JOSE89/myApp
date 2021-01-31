import React, {useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { deletePanelAction } from '../store/actions/refreshPanelActions';


const DeleteSoocerDialog = ({deleteSoccertDialog, soccer, setDeleteSoccerDialog, setSubmitted}) => {
    const dispath = useDispatch();

    const hideDeleteSoccerDialog = useCallback(() => {
        setSubmitted(false);
        setDeleteSoccerDialog(false);
        }, [setDeleteSoccerDialog, setSubmitted]);

    const deleteProduct = useCallback(() => {
        dispath(deletePanelAction(soccer));
        setDeleteSoccerDialog(false);
        toast.success('Delete succesfully');
        },[dispath, setDeleteSoccerDialog, soccer]);    

    const deleteProductDialogFooter = useMemo(()=> (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteSoccerDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
        </React.Fragment>
    ), [deleteProduct, hideDeleteSoccerDialog]);

return (
    <Dialog visible={deleteSoccertDialog}
    style={{ width: '450px' }}
    header="Confirm"
    modal
    footer={deleteProductDialogFooter}
    onHide={hideDeleteSoccerDialog}>
        <div className="confirmation-content">
            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
            {soccer && <span>Are you sure you want to delete {soccer?.home} - {soccer?.visit}?`</span>}
        </div>
    </Dialog>
);
}

DeleteSoocerDialog.protoTypes = {
    deleteSoccertDialog: PropTypes.object,
    soccer: PropTypes.object,
    setSubmitted: PropTypes.func,
    setDeleteSoccerDialog: PropTypes.func
};

export default (DeleteSoocerDialog);