import test from 'node:test';import assert from 'node:assert/strict';import {initialState,validateState,volume,validNumber,localDate} from '../model.js';
test('semana editável, sem prescrição e sem meta de peso inventada',()=>{const s=initialState();assert.equal(s.plans.length,7);assert.ok(s.plans.every(p=>p.exercises.length===0));assert.equal(s.profile.goal,null);assert.equal(validateState(s),s)});
test('volume soma carga por repetições em cada série',()=>assert.equal(volume({exercises:[{sets:[{load:20,reps:12},{load:25,reps:10}]},{sets:[{load:10,reps:8}]}]}),570));
test('rejeita entradas vazias, negativas e não finitas',()=>{for(const v of ['',-1,Infinity,'abc'])assert.equal(validNumber(v),false);assert.equal(validNumber(0),true)});
test('backup corrompido não substitui dados',()=>{assert.throws(()=>validateState({}));let s=initialState();s.weights.push({date:localDate(),value:-20});assert.throws(()=>validateState(s));s=initialState();s.plans[0].exercises=[{name:'Remada',sets:0}];assert.throws(()=>validateState(s))});
test('data usa calendário local',()=>assert.equal(localDate(new Date(2026,9,10,23,30)),'2026-10-10'));
