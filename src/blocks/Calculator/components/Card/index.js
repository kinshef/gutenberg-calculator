const BootstrapContainer = ({ children, bootstrapGrid }) => {
	if(bootstrapGrid){
		return <div className='container'>{children}</div>
	} else {
		return children
	}
}
const BootstrapRow = ({ children, bootstrapGrid }) => {
	if(bootstrapGrid){
		return <div className='row'>
			{children}
		</div>
	} else {
		return children
	}
}
const BootstrapCol = ({ children, bootstrapGrid }) => {
	if(bootstrapGrid){
		return <div className='col'>
			{children}
		</div>
	} else {
		return children
	}
}














let coversArr = (trueIteration, fullForm, activeIteration, nameInput, product) => {
	if(trueIteration === activeIteration){
		return Object.keys(fullForm).map(inp => {
			return <div className="c__input d-inline-block mt-2">
				{inp === Object.keys(fullForm)[0]
					? <input id={`${product}-${nameInput}-${inp}`} type="radio" name={nameInput} value={inp} checked/>
					: <input id={`${product}-${nameInput}-${inp}`} type="radio" name={nameInput} value={inp}/>
				}
				<label for={`${product}-${nameInput}-${inp}`}>{inp}</label>
			</div>
		})
	} else {
		activeIteration++;
		return coversArr(trueIteration, fullForm[Object.keys(fullForm)[0]], activeIteration, nameInput, product)
	}
}

const BuildFormInputRadio = ( fullForm, formParameters, product ) => {
	return formParameters.sequence.map((nameInput,index)=>{
		let activeIteration = 0;
		return <div className="col-12 form-group castom_input">
			<div className="font-weight-bold">{formParameters.formTitle[nameInput]}</div>
			{coversArr(index, fullForm, activeIteration, nameInput, product)}
		</div>
	})
}

const BuildSectionCalc = ({ dataItems, maxColToRow, bottomSection }) => {
	return Object.keys(dataItems).map( product => {
		return <div className="col-md col-12 my-3" style={{minWidth: Math.round(100/maxColToRow)+'%'}}>
			<div className="section-catalog__cart-product">
				<form className="has-calculator text-center">
					<div className="has-calculator__taitl">{dataItems[product].productName}</div>
					<img src={dataItems[product].productImg} alt={dataItems[product].productName} className="img-fluid"/>
					<input type="hidden" name="form" value="Карточка товара"/>
					<input type="hidden" name="product" value={product}/>
					<input type="hidden" name="data" 
						data-datasequence={JSON.stringify(dataItems[product].formParameters.sequence)} 
						data-hasdata={JSON.stringify(dataItems[product].form)}
					/>
					<div className="col-12 text-center p-3 bg-white">
						{BuildFormInputRadio(dataItems[product].form, dataItems[product].formParameters, product)}
						<div className="col-12 pl-4">
							<s><span className="jPriceOld" data-animation="animated tada delay-1s">0</span><span> руб.</span></s>
							<div><span className="h3 text-red jPrice" data-animation="animated tada delay-1s">0</span><span> руб.</span></div>
						</div>
						<div className="col-12">
							{bottomSection.typeFeedback === 'modal'
								? <button type="button" className="btn my-3 btn-warning btn-block btn-lg shadow"
									data-toggle="modal" data-target={bottomSection.parametersBtn.modalTarget}>Заказать</button>
								: <div class="form-inline calculator-form my-3 align-items-stretch">
									<div class="form-group calculator-form-input">
										<input type="tel" name="phone" class="w-100 h-100 mx-1 form-control" placeholder={bottomSection.parametersBtn.placeholder} required=""/>
									</div>
									<div class="form-group calculator-form-button">
										<button type="submit" class={`w-100 mx-1 btn-warning`}>Заказать</button>
										{/* <button type="submit" class={`w-100 mx-1 ${bottomSection.parametersBtn.color}`}>Заказать</button> */}
									</div>
								</div>}
						</div>
					</div>
				</form>
			</div>
		</div>
	})
}

export const Card = {
	BootstrapContainer: BootstrapContainer,
	BootstrapRow: BootstrapRow,
	BootstrapCol: BootstrapCol,
	BuildSectionCalc: BuildSectionCalc,
}