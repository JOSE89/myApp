import React, {memo, useCallback, useMemo } from 'react';
import {useDispatch} from 'react-redux';
import classNames from 'classnames';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import PropTypes from 'prop-types';
import {updateFootballGameAction } from '../store/actions/refreshPanelActions';
import { InputText } from 'primereact/inputtext';
import {toast} from 'react-toastify';

const EditSoccerDialog = ({soccerMatchEditDialog, setSoccerMatchEditDialog, setSoccerMatch,
    submitted, setSubmitted, onInputChange}) => {

  const dispath = useDispatch();

  const hideEditSoccerDialog = useCallback(() => {
    setSubmitted(false);
    setSoccerMatchEditDialog(false);
    }, [setSoccerMatchEditDialog, setSubmitted]);

  const updateProduct = useCallback(() => {
        setSubmitted(true);
        if (soccerMatchEditDialog?.home.trim()) {
            dispath(updateFootballGameAction(soccerMatchEditDialog));
            toast.success('Soocer match edited successfully')
            setSoccerMatch(null);
            setSoccerMatchEditDialog(false);
        }
    }, [dispath, setSoccerMatch, setSoccerMatchEditDialog, setSubmitted, soccerMatchEditDialog]);
    
  const productEditDialogFooter = useMemo(() =>(
    <React.Fragment>
        <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideEditSoccerDialog} />
        <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={updateProduct} />
    </React.Fragment>
),[hideEditSoccerDialog, updateProduct]);


return (
    <Dialog visible={soccerMatchEditDialog} 
    style={{ width: '450px' }}
    header="Edit soccer match"
    modal
    className="p-fluid"
    footer={productEditDialogFooter} 
    onHide={hideEditSoccerDialog}>
        <div className="p-field">
            <label htmlFor="home">Home</label>
            <InputText id="home" value={soccerMatchEditDialog?.home} onChange={(e) => onInputChange(e, 'home', true)}
            required autoFocus 
            className={classNames({ 'p-invalid': submitted && !soccerMatchEditDialog?.home })} 
            disabled={true}/>
            {submitted && !soccerMatchEditDialog?.home && <small className="p-error">Home is required.</small>}
        </div>
        <div className="p-field">
            <label htmlFor="visit">Visit</label>
            <InputText id="visit" value={soccerMatchEditDialog?.visit} onChange={(e) => onInputChange(e, 'visit', true)}
            required autoFocus 
            className={classNames({ 'p-invalid': submitted && !soccerMatchEditDialog?.visit })}
            disabled={true}/>
        </div>
        <div className="p-field">
            <label htmlFor="homeGoals">Home Goals</label>
            <InputText id="homeGoals" value={soccerMatchEditDialog?.homeGoals} onChange={(e) => onInputChange(e, 'homeGoals', true)}
            required autoFocus 
            className={classNames({ 'p-invalid': submitted && !soccerMatchEditDialog?.homeGoals })} 
            />
        </div>
        <div className="p-field">
            <label htmlFor="visit">Visit Goals</label>
            <InputText id="visit" value={soccerMatchEditDialog?.visitGoals} onChange={(e) => onInputChange(e, 'visitGoals', true)}
            required autoFocus 
            className={classNames({ 'p-invalid': submitted && !soccerMatchEditDialog?.visitGoals })} 
            />
        </div>
    </Dialog>
);
}

  EditSoccerDialog.protoTypes = {
    soccerMatchEditDialog: PropTypes.object,
    setSoccerMatch: PropTypes.func,
    submitted: PropTypes.func,
    setSubmitted: PropTypes.func,
    onInputChange: PropTypes.func,
    setSoccerMatchEditDialog:  PropTypes.func
};

export default memo(EditSoccerDialog);