/**
 * Clinical Narrative Interpretation Module for Neuro-Transmitter Questionnaire
 * 
 * This module generates clinically relevant interpretations of assessment results
 * for professional communication between PhD counselors and prescribers.
 */

// Neurotransmitter descriptions and clinical implications
const neurotransmitterProfiles = {
  dopamine: {
    name: 'Dopamine',
    function: 'Associated with motivation, focus, reward, and drive',
    dominantTraits: [
      'Strong motivation and drive',
      'Goal-oriented thinking and behavior',
      'Analytical and logical approach',
      'Strong focus on tasks and objectives',
      'Preference for structure and organization'
    ],
    deficiencyTraits: [
      'Difficulty initiating or completing tasks',
      'Reduced motivation and drive',
      'Problems with focus and concentration',
      'Fatigue and low energy',
      'Anhedonia (reduced ability to experience pleasure)'
    ],
    clinicalConsiderations: [
      'Dopaminergic pathways influence executive function, motivation, and reward processing',
      'Imbalances may present as difficulties with attention, motivation, and energy regulation',
      'Consider impact on treatment adherence and goal-directed behaviors',
      'May influence response to stimulant medications and dopaminergic agents'
    ],
    prescribingImplications: [
      'Dopamine deficiency patterns may respond to dopaminergic agents or stimulants when clinically indicated',
      'Consider potential impact on medication adherence and treatment engagement',
      'Dominant dopamine nature may suggest heightened sensitivity to dopaminergic agents',
      'May influence therapeutic response to medications affecting dopamine pathways'
    ]
  },
  acetylcholine: {
    name: 'Acetylcholine',
    function: 'Associated with learning, memory, creativity, and cognitive processing',
    dominantTraits: [
      'Strong memory and recall abilities',
      'Creative and innovative thinking',
      'Detail-oriented perception',
      'Intellectual curiosity',
      'Artistic or creative tendencies'
    ],
    deficiencyTraits: [
      'Memory difficulties and forgetfulness',
      'Reduced cognitive processing speed',
      'Difficulty learning new information',
      'Word-finding problems',
      'Reduced creative thinking'
    ],
    clinicalConsiderations: [
      'Cholinergic pathways influence memory formation, cognitive processing, and creative thinking',
      'Imbalances may present as cognitive difficulties, memory issues, or reduced creative capacity',
      'Consider impact on learning and information processing',
      'May influence cognitive side effects of medications'
    ],
    prescribingImplications: [
      'Acetylcholine deficiency patterns may benefit from cholinergic agents when clinically indicated',
      'Consider potential anticholinergic burden when prescribing multiple medications',
      'Dominant acetylcholine nature may suggest heightened sensitivity to anticholinergic side effects',
      'May influence cognitive side effect profiles of various medications'
    ]
  },
  gaba: {
    name: 'GABA',
    function: 'Associated with calm, stability, relaxation, and stress management',
    dominantTraits: [
      'Natural calmness and stability',
      'Steady and methodical approach',
      'Patience and persistence',
      'Reliable and consistent behavior',
      'Ability to manage stress effectively'
    ],
    deficiencyTraits: [
      'Anxiety and tension',
      'Difficulty relaxing or unwinding',
      'Sleep disturbances',
      'Feeling overwhelmed by stress',
      'Restlessness and irritability'
    ],
    clinicalConsiderations: [
      'GABAergic pathways influence anxiety regulation, stress response, and sleep',
      'Imbalances may present as anxiety, tension, irritability, or sleep disturbances',
      'Consider impact on stress tolerance and emotional regulation',
      'May influence response to anxiolytic medications'
    ],
    prescribingImplications: [
      'GABA deficiency patterns may respond to GABAergic agents when clinically indicated',
      'Consider potential for tolerance and dependence with GABAergic medications',
      'Dominant GABA nature may suggest different dose requirements for anxiolytic medications',
      'May influence side effect profiles and therapeutic response to various psychotropic medications'
    ]
  },
  serotonin: {
    name: 'Serotonin',
    function: 'Associated with mood regulation, social connection, and emotional balance',
    dominantTraits: [
      'Natural optimism and positive outlook',
      'Strong social connections and interpersonal skills',
      'Emotional resilience and adaptability',
      'Sense of contentment and well-being',
      'Balanced emotional responses'
    ],
    deficiencyTraits: [
      'Depressed mood or emotional flatness',
      'Social withdrawal or isolation',
      'Emotional sensitivity or reactivity',
      'Sleep disturbances',
      'Rumination and negative thought patterns'
    ],
    clinicalConsiderations: [
      'Serotonergic pathways influence mood regulation, social behavior, and emotional processing',
      'Imbalances may present as mood disturbances, social difficulties, or emotional dysregulation',
      'Consider impact on interpersonal functioning and emotional resilience',
      'May influence response to serotonergic medications'
    ],
    prescribingImplications: [
      'Serotonin deficiency patterns may respond to serotonergic agents when clinically indicated',
      'Consider potential for serotonin syndrome when combining multiple serotonergic medications',
      'Dominant serotonin nature may suggest different dose requirements for serotonergic medications',
      'May influence side effect profiles and therapeutic response to antidepressant medications'
    ]
  }
};

// Interpretation thresholds
const interpretationThresholds = {
  dominant: {
    high: 35, // Classically dominant
    moderate: 25, // Moderately dominant
    mild: 15 // Mildly dominant
  },
  deficiency: {
    high: 20, // Significant deficiency
    moderate: 15, // Moderate deficiency
    mild: 10 // Mild deficiency
  },
  gap: {
    significant: 15, // Significant gap between scores
    moderate: 10, // Moderate gap
    mild: 5 // Mild gap
  }
};

// Generate clinical interpretation based on scores
function generateClinicalInterpretation(scores, container) {
  if (!container) return;
  
  // Calculate dominant neurotransmitter
  const dominantNeurotransmitter = getDominantNeurotransmitter(scores.part1);
  
  // Calculate deficient neurotransmitters
  const deficientNeurotransmitters = getDeficientNeurotransmitters(scores.part2);
  
  // Calculate relative gaps
  const relativeGaps = calculateRelativeGaps(scores);
  
  // Generate interpretation text
  let interpretationHTML = `
    <div class="interpretation-section">
      <h4>Clinical Summary</h4>
      <p>This assessment provides correlational data regarding neurotransmitter patterns that may inform clinical decision-making. The results suggest the following neurochemical profile:</p>
    </div>
  `;
  
  // Add dominant nature section
  interpretationHTML += generateDominantNatureSection(dominantNeurotransmitter, scores.part1);
  
  // Add deficiency section
  interpretationHTML += generateDeficiencySection(deficientNeurotransmitters, scores.part2);
  
  // Add pattern analysis section
  interpretationHTML += generatePatternAnalysisSection(relativeGaps, scores);
  
  // Add clinical considerations section
  interpretationHTML += generateClinicalConsiderationsSection(dominantNeurotransmitter, deficientNeurotransmitters, relativeGaps);
  
  // Add prescribing implications section
  interpretationHTML += generatePrescribingImplicationsSection(dominantNeurotransmitter, deficientNeurotransmitters, relativeGaps);
  
  // Add clinical disclaimer
  interpretationHTML += `
    <div class="disclaimer clinical-disclaimer">
      <h4>Clinical Disclaimer</h4>
      <p>This assessment provides correlational data that may inform clinical decision-making but should be integrated with comprehensive evaluation. 
      Results should be interpreted within the context of the client's full clinical presentation, history, and other assessment findings. 
      This tool is designed to facilitate clinical communication between PhD counselors and prescribers.</p>
    </div>
  `;
  
  // Set interpretation HTML
  container.innerHTML = interpretationHTML;
}

// Get dominant neurotransmitter based on part 1 scores
function getDominantNeurotransmitter(part1Scores) {
  const neurotransmitters = ['dopamine', 'acetylcholine', 'gaba', 'serotonin'];
  
  // Find highest score
  let highestScore = 0;
  let dominantNT = null;
  
  neurotransmitters.forEach(nt => {
    const score = part1Scores[nt];
    if (score > highestScore) {
      highestScore = score;
      dominantNT = nt;
    }
  });
  
  // Determine dominance level
  let dominanceLevel = 'none';
  if (highestScore >= interpretationThresholds.dominant.high) {
    dominanceLevel = 'high';
  } else if (highestScore >= interpretationThresholds.dominant.moderate) {
    dominanceLevel = 'moderate';
  } else if (highestScore >= interpretationThresholds.dominant.mild) {
    dominanceLevel = 'mild';
  }
  
  return {
    neurotransmitter: dominantNT,
    score: highestScore,
    level: dominanceLevel
  };
}

// Get deficient neurotransmitters based on part 2 scores
function getDeficientNeurotransmitters(part2Scores) {
  const neurotransmitters = ['dopamine', 'acetylcholine', 'gaba', 'serotonin'];
  const deficiencies = [];
  
  neurotransmitters.forEach(nt => {
    const score = part2Scores[nt];
    let deficiencyLevel = 'none';
    
    if (score >= interpretationThresholds.deficiency.high) {
      deficiencyLevel = 'high';
    } else if (score >= interpretationThresholds.deficiency.moderate) {
      deficiencyLevel = 'moderate';
    } else if (score >= interpretationThresholds.deficiency.mild) {
      deficiencyLevel = 'mild';
    }
    
    if (deficiencyLevel !== 'none') {
      deficiencies.push({
        neurotransmitter: nt,
        score: score,
        level: deficiencyLevel
      });
    }
  });
  
  // Sort by score (highest first)
  deficiencies.sort((a, b) => b.score - a.score);
  
  return deficiencies;
}

// Calculate relative gaps between dominant nature and deficiencies
function calculateRelativeGaps(scores) {
  const neurotransmitters = ['dopamine', 'acetylcholine', 'gaba', 'serotonin'];
  const gaps = [];
  
  neurotransmitters.forEach(nt => {
    const dominantScore = scores.part1[nt];
    const deficiencyScore = scores.part2[nt];
    
    // Calculate normalized gap (positive means deficiency > dominance)
    const normalizedGap = (deficiencyScore / 28) - (dominantScore / 40);
    const gapPercentage = Math.round(normalizedGap * 100);
    
    let gapLevel = 'balanced';
    if (gapPercentage >= 30) {
      gapLevel = 'very high';
    } else if (gapPercentage >= 15) {
      gapLevel = 'high';
    } else if (gapPercentage >= 5) {
      gapLevel = 'moderate';
    } else if (gapPercentage <= -30) {
      gapLevel = 'very low';
    } else if (gapPercentage <= -15) {
      gapLevel = 'low';
    } else if (gapPercentage <= -5) {
      gapLevel = 'slightly low';
    }
    
    gaps.push({
      neurotransmitter: nt,
      dominantScore: dominantScore,
      deficiencyScore: deficiencyScore,
      gapPercentage: gapPercentage,
      level: gapLevel
    });
  });
  
  // Sort by absolute gap (highest first)
  gaps.sort((a, b) => Math.abs(b.gapPercentage) - Math.abs(a.gapPercentage));
  
  return gaps;
}

// Generate dominant nature section
function generateDominantNatureSection(dominantNT, part1Scores) {
  if (!dominantNT || !dominantNT.neurotransmitter) {
    return `
      <div class="interpretation-section">
        <h4>Dominant Neurotransmitter Nature</h4>
        <p>No clearly dominant neurotransmitter pattern was identified. This may suggest a balanced neurochemical profile or insufficient data to determine dominance.</p>
      </div>
    `;
  }
  
  const nt = dominantNT.neurotransmitter;
  const profile = neurotransmitterProfiles[nt];
  
  let dominanceText = '';
  if (dominantNT.level === 'high') {
    dominanceText = 'classically dominant';
  } else if (dominantNT.level === 'moderate') {
    dominanceText = 'moderately dominant';
  } else if (dominantNT.level === 'mild') {
    dominanceText = 'mildly dominant';
  }
  
  // Get secondary neurotransmitter if applicable
  const neurotransmitters = ['dopamine', 'acetylcholine', 'gaba', 'serotonin'];
  const otherScores = neurotransmitters.filter(n => n !== nt).map(n => ({
    neurotransmitter: n,
    score: part1Scores[n]
  }));
  
  otherScores.sort((a, b) => b.score - a.score);
  const secondaryNT = otherScores[0];
  
  let secondaryText = '';
  if (secondaryNT.score >= interpretationThresholds.dominant.moderate && 
      (dominantNT.score - secondaryNT.score) < interpretationThresholds.gap.moderate) {
    secondaryText = `<p>There is also a notable ${neurotransmitterProfiles[secondaryNT.neurotransmitter].name} influence (score: ${secondaryNT.score}), suggesting a mixed ${profile.name}-${neurotransmitterProfiles[secondaryNT.neurotransmitter].name} profile.</p>`;
  }
  
  return `
    <div class="interpretation-section">
      <h4>Dominant Neurotransmitter Nature</h4>
      <p>The results indicate a <strong>${dominanceText} ${profile.name}</strong> nature (score: ${dominantNT.score}). ${profile.name} is ${profile.function.toLowerCase()}.</p>
      ${secondaryText}
      <p>Individuals with dominant ${profile.name} patterns often exhibit these characteristics:</p>
      <ul>
        ${profile.dominantTraits.map(trait => `<li>${trait}</li>`).join('')}
      </ul>
    </div>
  `;
}

// Generate deficiency section
function generateDeficiencySection(deficientNTs, part2Scores) {
  if (deficientNTs.length === 0) {
    return `
      <div class="interpretation-section">
        <h4>Neurotransmitter Deficiency Patterns</h4>
        <p>No significant neurotransmitter deficiency patterns were identified. This suggests relatively balanced neurochemical functioning across all assessed neurotransmitter systems.</p>
      </div>
    `;
  }
  
  let deficiencyHTML = `
    <div class="interpretation-section">
      <h4>Neurotransmitter Deficiency Patterns</h4>
  `;
  
  // Primary deficiency
  const primaryDeficiency = deficientNTs[0];
  const primaryProfile = neurotransmitterProfiles[primaryDeficiency.neurotransmitter];
  
  let deficiencyLevel = '';
  if (primaryDeficiency.level === 'high') {
    deficiencyLevel = 'significant';
  } else if (primaryDeficiency.level === 'moderate') {
    deficiencyLevel = 'moderate';
  } else if (primaryDeficiency.level === 'mild') {
    deficiencyLevel = 'mild';
  }
  
  deficiencyHTML += `
    <p>The results indicate a <strong>${deficiencyLevel} ${primaryProfile.name}</strong> deficiency pattern (score: ${primaryDeficiency.score}). This may manifest as:</p>
    <ul>
      ${primaryProfile.deficiencyTraits.map(trait => `<li>${trait}</li>`).join('')}
    </ul>
  `;
  
  // Secondary deficiencies if present
  if (deficientNTs.length > 1) {
    const secondaryDeficiencies = deficientNTs.slice(1);
    
    deficiencyHTML += `
      <p>Additional deficiency patterns were identified:</p>
      <ul>
        ${secondaryDeficiencies.map(def => {
          let level = '';
          if (def.level === 'high') {
            level = 'Significant';
          } else if (def.level === 'moderate') {
            level = 'Moderate';
          } else if (def.level === 'mild') {
            level = 'Mild';
          }
          
          return `<li><strong>${level} ${neurotransmitterProfiles[def.neurotransmitter].name}</strong> deficiency (score: ${def.score})</li>`;
        }).join('')}
      </ul>
      <p>Multiple deficiency patterns may suggest more complex neurochemical interactions that could influence clinical presentation and treatment response.</p>
    `;
  }
  
  deficiencyHTML += `</div>`;
  
  return deficiencyHTML;
}

// Generate pattern analysis section
function generatePatternAnalysisSection(relativeGaps, scores) {
  // Find most significant gap
  const significantGap = relativeGaps[0];
  
  let gapAnalysisText = '';
  
  if (Math.abs(significantGap.gapPercentage) >= 15) {
    const nt = significantGap.neurotransmitter;
    const profile = neurotransmitterProfiles[nt];
    
    if (significantGap.gapPercentage > 0) {
      // Deficiency > Dominance
      gapAnalysisText = `
        <p>The most notable pattern is a significant imbalance in the <strong>${profile.name}</strong> system, where the deficiency score (${significantGap.deficiencyScore}) is proportionally much higher than the dominance score (${significantGap.dominantScore}). This suggests a potential acquired or situational deficiency rather than a lifelong pattern.</p>
        <p>This type of imbalance often indicates a neurochemical system under stress or depletion, which may be more responsive to targeted interventions.</p>
      `;
    } else {
      // Dominance > Deficiency
      gapAnalysisText = `
        <p>The most notable pattern is a significant strength in the <strong>${profile.name}</strong> system, where the dominance score (${significantGap.dominantScore}) is proportionally much higher than the deficiency score (${significantGap.deficiencyScore}). This suggests a robust and stable ${profile.name} system that likely represents a lifelong pattern.</p>
        <p>This type of balance often indicates a neurochemical strength that can be leveraged in treatment planning and may provide resilience against certain types of dysfunction.</p>
      `;
    }
  } else {
    gapAnalysisText = `
      <p>There are no extreme imbalances between dominance and deficiency scores across the neurotransmitter systems. This suggests a relatively stable neurochemical profile without dramatic fluctuations between baseline functioning and current state.</p>
    `;
  }
  
  return `
    <div class="interpretation-section">
      <h4>Pattern Analysis</h4>
      ${gapAnalysisText}
      <p>The overall pattern suggests a neurochemical profile with the following characteristics:</p>
      <ul>
        <li><strong>Dopamine system:</strong> Dominance score ${scores.part1.dopamine}, Deficiency score ${scores.part2.dopamine}</li>
        <li><strong>Acetylcholine system:</strong> Dominance score ${scores.part1.acetylcholine}, Deficiency score ${scores.part2.acetylcholine}</li>
        <li><strong>GABA system:</strong> Dominance score ${scores.part1.gaba}, Deficiency score ${scores.part2.gaba}</li>
        <li><strong>Serotonin system:</strong> Dominance score ${scores.part1.serotonin}, Deficiency score ${scores.part2.serotonin}</li>
      </ul>
    </div>
  `;
}

// Generate clinical considerations section
function generateClinicalConsiderationsSection(dominantNT, deficientNTs, relativeGaps) {
  let considerationsHTML = `
    <div class="interpretation-section">
      <h4>Clinical Considerations</h4>
  `;
  
  // Add dominant nature considerations
  if (dominantNT && dominantNT.neurotransmitter) {
    const dominantProfile = neurotransmitterProfiles[dominantNT.neurotransmitter];
    
    considerationsHTML += `
      <p><strong>Dominant ${dominantProfile.name} Nature:</strong></p>
      <ul>
        ${dominantProfile.clinicalConsiderations.map(consideration => `<li>${consideration}</li>`).join('')}
      </ul>
    `;
  }
  
  // Add deficiency considerations
  if (deficientNTs.length > 0) {
    const primaryDeficiency = deficientNTs[0];
    const deficiencyProfile = neurotransmitterProfiles[primaryDeficiency.neurotransmitter];
    
    considerationsHTML += `
      <p><strong>${deficiencyProfile.name} Deficiency Pattern:</strong></p>
      <ul>
        ${deficiencyProfile.clinicalConsiderations.map(consideration => `<li>${consideration}</li>`).join('')}
      </ul>
    `;
  }
  
  // Add interaction considerations if applicable
  if (dominantNT && dominantNT.neurotransmitter && deficientNTs.length > 0) {
    const dominantSystem = dominantNT.neurotransmitter;
    const deficientSystem = deficientNTs[0].neurotransmitter;
    
    if (dominantSystem !== deficientSystem) {
      considerationsHTML += `
        <p><strong>System Interaction Considerations:</strong></p>
        <p>The combination of dominant ${neurotransmitterProfiles[dominantSystem].name} nature with ${neurotransmitterProfiles[deficientSystem].name} deficiency suggests potential interactions between these systems that may influence clinical presentation and treatment response.</p>
        <ul>
          <li>Consider how ${neurotransmitterProfiles[dominantSystem].name}-${neurotransmitterProfiles[deficientSystem].name} interactions may affect cognitive function, mood regulation, and behavioral patterns</li>
          <li>Assess for compensatory mechanisms that may mask or exacerbate symptoms</li>
          <li>Monitor for potential shifts in symptom presentation as treatment progresses</li>
        </ul>
      `;
    }
  }
  
  considerationsHTML += `</div>`;
  
  return considerationsHTML;
}

// Generate prescribing implications section
function generatePrescribingImplicationsSection(dominantNT, deficientNTs, relativeGaps) {
  let implicationsHTML = `
    <div class="interpretation-section">
      <h4>Prescribing Implications</h4>
      <p>The following considerations may inform prescribing decisions, though they should be integrated with comprehensive clinical assessment:</p>
  `;
  
  // Add dominant nature implications
  if (dominantNT && dominantNT.neurotransmitter) {
    const dominantProfile = neurotransmitterProfiles[dominantNT.neurotransmitter];
    
    implicationsHTML += `
      <p><strong>Dominant ${dominantProfile.name} Nature:</strong></p>
      <ul>
        ${dominantProfile.prescribingImplications.map(implication => `<li>${implication}</li>`).join('')}
      </ul>
    `;
  }
  
  // Add deficiency implications
  if (deficientNTs.length > 0) {
    const primaryDeficiency = deficientNTs[0];
    const deficiencyProfile = neurotransmitterProfiles[primaryDeficiency.neurotransmitter];
    
    implicationsHTML += `
      <p><strong>${deficiencyProfile.name} Deficiency Pattern:</strong></p>
      <ul>
        ${deficiencyProfile.prescribingImplications.map(implication => `<li>${implication}</li>`).join('')}
      </ul>
    `;
  }
  
  // Add general prescribing considerations
  implicationsHTML += `
    <p><strong>General Considerations:</strong></p>
    <ul>
      <li>Consider starting with lower doses and titrating gradually when introducing new medications</li>
      <li>Monitor for both therapeutic effects and side effects that may be influenced by the identified neurochemical patterns</li>
      <li>Reassess periodically as neurochemical patterns may shift with treatment and life circumstances</li>
      <li>Consider integrating non-pharmacological approaches that target identified neurochemical patterns</li>
    </ul>
  `;
  
  implicationsHTML += `</div>`;
  
  return implicationsHTML;
}

// Export functions
export {
  generateClinicalInterpretation,
  neurotransmitterProfiles,
  interpretationThresholds
};
