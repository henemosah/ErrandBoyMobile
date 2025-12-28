import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
//import Peer from 'simple-peer';
const SimplePeer = require('simple-peer'); 

@Injectable({ providedIn: 'root' })
export class CallService {
  private peer: any;
  private callDoc: any;

  constructor(private firestore: AngularFirestore) {}

  async initCall(localStream: MediaStream, callId: string, isInitiator: boolean) {
    this.callDoc = this.firestore.collection('calls').doc(callId);
    const offerCandidates = this.callDoc.collection('offerCandidates');
    const answerCandidates = this.callDoc.collection('answerCandidates');

    this.peer = new SimplePeer({ initiator: isInitiator, trickle: false, stream: localStream });

    this.peer.on('signal', async (data: any) => {
      if (isInitiator) {
        await this.callDoc.set({ offer: data });
      } else {
        await this.callDoc.update({ answer: data });
      }
    });

    this.peer.on('stream', (remoteStream: MediaStream) => {
      const remoteVideo = document.getElementById('remoteVideo') as HTMLVideoElement;
      remoteVideo.srcObject = remoteStream;
      remoteVideo.play();
    });

    if (!isInitiator) {
      this.callDoc.valueChanges().subscribe(async (data: any) => {
        if (data?.offer) {
          this.peer.signal(data.offer);
        }
        if (data?.answer) {
          this.peer.signal(data.answer);
        }
      });
    }
  }

  async sendCandidate(type: 'offerCandidates' | 'answerCandidates', candidate: any) {
    await this.callDoc.collection(type).add(candidate);
  }

  receiveSignal(signal: any) {
    this.peer.signal(signal);
  }

  endCall() {
    if (this.peer) this.peer.destroy();
  }
}
