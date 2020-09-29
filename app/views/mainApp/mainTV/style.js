import { Platform } from 'react-native'
import { fs } from "../../../components/common/fontSizeData";
import { cd } from '../../../components/common/colorData';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import shadowUi from '../../../components/common/shadowUi';

export default styles = {

  animationArea: {
    height: 250,
    width: wp(100) - 30,
    borderRadius: 15,
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: cd.background
  },

  container: {
    flex: 1,
    backgroundColor: cd.title
  },

  contentArea: {
    flex: 1,
    justifyContent: 'space-between',
  },

  listArea: {
    flex: 1,
    padding: 10
  },


  listContent: {
    flex: 1,
  },

  menuArea: {
    margin: 5,
    flex: 1,
    // padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

  menuNavArea: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  subStyle: {
    margin: 10,
    flex: 1,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: cd.title,
    marginHorizontal: 15,
    ...shadowUi
  },

  menuLabelArea: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
    alignItems: 'center'
  },

  menuImageArea: {
    width: 40,
    height: 40,
    borderRadius: wp(10),
    backgroundColor: cd.bgInput,
    justifyContent: 'center',
    position: 'relative'
  },

  menuImg: {
    width: wp(40),
    height: wp(60),
  },

  emptyStateContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: hp(90),
  },


}