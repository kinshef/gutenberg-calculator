
// let coversArr = (trueIteration, fullForm, activeIteration) => {
// 	if(trueIteration === activeIteration){
// 		return Object.keys(fullForm).map(inp => {
// 			return <div className="c__input d-inline-block mt-2">
// 				{inp === Object.keys(fullForm)[0]
// 					? <input id={`${product}-${nameInput}-${inp}`} type="radio" name={nameInput} value={inp} checked/>
// 					: <input id={`${product}-${nameInput}-${inp}`} type="radio" name={nameInput} value={inp}/>
// 				}
// 				<label for={`${product}-${nameInput}-${inp}`}>{inp}</label>
// 			</div>
// 		})
// 	} else {
// 		activeIteration++;
// 		return coversArr(trueIteration, fullForm[Object.keys(fullForm)[0]], activeIteration, nameInput, product)
// 	}
// }

// let coversArr = (trueIteration, fullForm, activeIteration) => {
// 	if(trueIteration === activeIteration){

//         // let iteration+activeIteration = $("input[name='"+e+"']:checked", form).val();
//         console.log()
//         // return Object.keys(fullForm).map(inp => {
// 		// 	return inp
// 		// })
// 	} else {
// 		// activeIteration++;
// 		// return coversArr(trueIteration, fullForm[Object.keys(fullForm)[0]], activeIteration)
// 	}
// }
let coversArr = (form, data, dataSequence, activeIteration) => {
    let a = $("input[name='"+dataSequence[activeIteration]+"']:checked", form).val();
    if(typeof(data[a]) === 'string' || typeof(data[a]) === 'number'){
        return data[a]
    }else {
        activeIteration++;
        return coversArr(form, data[a], dataSequence, activeIteration)
    }
}

$(document).ready(function() {
    $("form.has-calculator").change(function () {
        var form = this;
        var data = $("input[name='data']", form).data().hasdata;
        var dataSequence = $("input[name='data']", form).data().datasequence;
        var sum = 0;
        // var product = $("input[name='product']", form).val();
        // var length = $("input[name='length']:checked", form).val();

        let activeIteration = 0;
        sum += coversArr(form, data, dataSequence, activeIteration)
        var out = $('.jPrice', form);
        var outOld = $('.jPriceOld', form);

        var animateFrom = 0 < out.data("animateFrom") ? out.data("animateFrom") : 0;

        $({ animateNumber: animateFrom }).animate({ animateNumber: sum }, {
            duration: 800,
            step: function (animateNumber){
                out.text(Number(animateNumber).toFixed());
                outOld.text(Number(animateNumber * 1.27).toFixed())
            },
            complete: function() {
                out.data("animateFrom", Number(sum).toFixed())
            }
        });
    })
    $("form.has-calculator").change();
})

