import { useStateContext } from "../hooks/useSQML";

function SwitchButton(props) {
    const { translateMode } = useStateContext();
    return( 
        <div className="tg-list-item">
            <input className="tgl tgl-skewed" id="cb3" type="checkbox" onChange={props.onChange} checked={translateMode}/><label className="tgl-btn" data-tg-off="Translate" data-tg-on="Just Run" for="cb3"></label>
        </div>
    )
}

export default SwitchButton