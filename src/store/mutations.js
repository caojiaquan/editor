import {
	SHOWPREVIEW,
	CHOOSEIMAGE,
	CANCELIMAGE,
	OPENCOVER
} from './type.js'
import Vue from 'vue';
const state={
	preStatus: false,
	coverFlag: false,
	coverImage: [],
	checkedImage: [],
	saveBaseUrl: 'http://103.36.220.22:60191',
	pushBaseUrl: 'http://103.36.220.22:60191'
};
const mutations={
	/*头部*/
	[SHOWPREVIEW](state){
		state.preStatus=true;
	},
	[CHOOSEIMAGE](state){
		state.coverFlag=false;
	},
	[CANCELIMAGE](state){
		state.coverFlag=false;
	},
	[OPENCOVER](state){
		state.coverFlag=true;
	}
};

const getters={
	preStatus(state){
		return state.preStatus;
	},
	serverUrl(state){
		return state.serverUrl;
	},
	coverFlag(state){
		return state.coverFlag;
	},
	coverImage(state){
		return state.coverImage;
	},
	checkedImage(state){
		return state.checkedImage;
	}
	
};

export default{
	state,
	mutations,
	getters
}