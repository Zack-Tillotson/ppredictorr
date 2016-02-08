import utils from './utils';

export default {

  requestAuth(service, onError) {
    const ref = utils.connect();
    if(['google', 'twitter', 'facebook'].indexOf(service) >= 0) {
      ref.authWithOAuthRedirect(service, onError);
    } else if(service == 'anonymous') {
      ref.authAnonymously(onError);
    }
  },

  requestUnauth(service, onError) {
    const ref = utils.connect();
    ref.unauth();
  },

  syncConnection(onData) {
    let ref = utils.connect('.info/connected');
    ref.onAuth((auth) => {
      onData({path: '.info/auth', error: false, data: auth});
    });
    ref.on(
      'value', 
      snapshot => {
        if(snapshot.exists()) {
          onData({path: '.info/connected', error: false, data: snapshot.val()});
        } else {
          onData({path: '.info/connected', error: false, data: false});
        }
      }
    );
    ref = utils.connect('.info/serverTimeOffset');
    ref.on(
      'value', 
      snapshot => {
        if(snapshot.exists()) {
          onData({path: '.info/serverTimeOffset', error: false, data: snapshot.val()});
        }
      }
    );
  },

  syncData(onData, path = '/') {
    const ref = utils.connect(path);
    ref.on(
      'value', 
      snapshot => {
        if(snapshot.exists()) {
          onData({path, error: false, data: snapshot.val()});
        } else {
          onData({path, error: true, data: {}});
        }
      }, 
      error => {
        console.log("Firebase error", error);
        onData({path, error: true, data: null, errorData: error});
      }
    );

    return ref;
  },

  putChallenge(challenge) {
    const ref = utils.connect('challenges');
    const {id, ...challengeData} = challenge;
    if(id) {
      return ref.child(challenge.id).set(challengeData);
    } else {
      return ref.push(challengeData);
    }
  },

  putGroup(challengeId, userId) {
    const ref = utils.connect('groups');
    const groupRef = ref.push({challengeId, userId})
      .then(result => {
        utils.connect('users').child(userId).child('challenges').child(challengeId).push(result.key())
        return result;
      });

    return groupRef;
  },

  // First see if the user has a group id for this challenge already
  // If yes, return it
  // If no, push 
  //    /groups/group id = {owner: user id, challenge: challenge id}
  //    /users/user id/challenges/challenge id = group id
  // then return it
  getGroupChallengeId(userId, challengeId, onData) {
    const ref = utils.connect();

    ref.child('users').child(userId).child('challenges').child(challengeId).once(
      'value', 
      snapshot => {
        if(snapshot.exists()) {
          // sync /groups/group id
        } else {
          // push {owner: user id} to /groups/group id
          // push group id to /users/user id/challenges/challenge id
          // sync /groups/group id
        }
      }
    ); 
  },
}