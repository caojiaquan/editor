
import * as types from './type.js'

export default{
	showPreview:({commit})=>{
		commit(types.SHOWPREVIEW);
	},
	chooseimage:({commit})=>{
		commit(types.CHOOSEIMAGE);
	},
	cancelimage:({commit})=>{
		commit(types.CANCELIMAGE);
	},
	openCover:({commit})=>{
		commit(types.OPENCOVER);
	}
}
