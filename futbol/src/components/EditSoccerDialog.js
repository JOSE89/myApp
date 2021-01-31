import React, {memo, useCallback, useMemo } from 'react';
import {useDispatch} from 'react-redux';
import classNames from 'classnames';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import PropTypes from 'prop-types';
import {updateFootballGameAction } from '../store/actions/refreshPanelActions';
import { InputText } from 'primereact/inputtext';
import {toast} from 'react-toastify';

const EditSoccerDialog = ({soccerEditDialog, setProductEditDialog, setProduct,
    submitted, setSubmitted, onInputChange}) => {

  const dispath = useDispatch();

  const hideEditSoccerDialog = useCallback(() => {
    setSubmitted(false);
    setProductEditDialog(false);
    }, [setProductEditDialog, setSubmitted]);

  const updateProduct = useCallback(() => {
        setSubmitted(true);
        if (soccerEditDialog?.home.trim()) {
            dispath(updateFootballGameAction(soccerEditDialog));
            toast.success('Soocer match edited successfully')
            setProduct(null);
            setProductEditDialog(false);
        }
    }, [dispath, setProduct, setProductEditDialog, setSubmitted, soccerEditDialog]);
    
  const productEditDialogFooter = useMemo(() =>(
    <React.Fragment>
        <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideEditSoccerDialog} />
        <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={updateProduct} />
    </React.Fragment>
),[hideEditSoccerDialog, updateProduct]);


return (
    <Dialog visible={soccerEditDialog} 
    style={{ width: '450px' }}
    header="Edit soccer match"
    modal
    className="p-fluid"
    footer={productEditDialogFooter} 
    onHide={hideEditSoccerDialog}>
        <div className="p-field">
            <label htmlFor="home">Home</label>
            <InputText id="home" value={soccerEditDialog?.home} onChange={(e) => onInputChange(e, 'home', true)}
            required autoFocus 
            className={classNames({ 'p-invalid': submitted && !soccerEditDialog?.home })} 
            />
            {submitted && !soccerEditDialog?.home && <small className="p-error">Home is required.</small>}
        </div>
        <div className="p-field">
            <label htmlFor="visit">Visit</label>
            <InputText id="visit" value={soccerEditDialog?.visit} onChange={(e) => onInputChange(e, 'visit', true)}
            required autoFocus 
            className={classNames({ 'p-invalid': submitted && !soccerEditDialog?.visit })} 
            />
        </div>
        <div className="p-field">
            <label htmlFor="homeGoals">Home Goals</label>
            <InputText id="homeGoals" value={soccerEditDialog?.homeGoals} onChange={(e) => onInputChange(e, 'homeGoals', true)}
            required autoFocus 
            className={classNames({ 'p-invalid': submitted && !soccerEditDialog?.homeGoals })} 
            />
        </div>
        <div className="p-field">
            <label htmlFor="visit">Visit Goals</label>
            <InputText id="visit" value={soccerEditDialog?.visitGoals} onChange={(e) => onInputChange(e, 'visitGoals', true)}
            required autoFocus 
            className={classNames({ 'p-invalid': submitted && !soccerEditDialog?.visitGoals })} 
            />
        </div>
    </Dialog>
);
}

  EditSoccerDialog.protoTypes = {
    soccerEditDialog: PropTypes.object,
    setProduct: PropTypes.func,
    submitted: PropTypes.func,
    setSubmitted: PropTypes.func,
    onInputChange: PropTypes.func,
    setProductEditDialog:  PropTypes.func
};

export default memo(EditSoccerDialog);