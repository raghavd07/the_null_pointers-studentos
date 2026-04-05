function analyzeAttendance({ attendedClasses, totalClasses, targetAttendance, upcomingClasses }) {
  if (totalClasses === 0) {
    return { error: 'No classes recorded yet' };
  }

  const current = (attendedClasses / totalClasses) * 100;
  const target = targetAttendance || 75;
  const buffer = current - target;

  let status, classesCanMiss = 0, classesToAttend = 0, message = '';

  if (buffer >= 5) {
    status = 'SAFE';

    classesCanMiss = Math.floor(attendedClasses / (target / 100) - totalClasses);

    message = `You can afford to miss ${classesCanMiss} more class${classesCanMiss !== 1 ? 'es' : ''} and still stay above your ${target}% target.`;

  } else if (buffer >= 0 && buffer < 5) {
    status = 'WARNING';

    classesCanMiss = Math.floor(attendedClasses / (target / 100) - totalClasses);
    classesCanMiss = Math.max(0, classesCanMiss);

    message = classesCanMiss === 0
      ? `You are right at the edge. Do NOT miss any more classes.`
      : `Warning: You can only miss ${classesCanMiss} more class${classesCanMiss !== 1 ? 'es' : ''}. Stay cautious.`;

  } else {
    status = 'CRITICAL';

    const numerator = (target / 100) * totalClasses - attendedClasses;
    const denominator = 1 - (target / 100);
    classesToAttend = Math.ceil(numerator / denominator);

    // 🔥 NEW FIX HERE
    if (upcomingClasses !== undefined && classesToAttend > upcomingClasses) {
      message = `Target ${target}% cannot be achieved. Even if you attend all ${upcomingClasses} upcoming classes, you will still fall short.`;
    } else {
      message = `You must attend the next ${classesToAttend} consecutive class${classesToAttend !== 1 ? 'es' : ''} to reach your ${target}% target.`;
    }
  }

  return {
    currentPercentage: parseFloat(current.toFixed(2)),
    targetAttendance: target,
    status,
    classesCanMiss,
    classesToAttend,
    message,
    buffer: parseFloat(buffer.toFixed(2)),
  };
}

module.exports = { analyzeAttendance };