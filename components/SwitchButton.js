
function SwitchButton(props) {
    const { translateMode } = props.states;
    return( 
        <div class="tg-list-item">
            <input class="tgl tgl-skewed" id="cb3" type="checkbox" onChange={props.onChange} checked={translateMode}/><label class="tgl-btn" data-tg-off="Translate" data-tg-on="Translate and Run" for="cb3"></label>
        </div>
    )
}

export default SwitchButton