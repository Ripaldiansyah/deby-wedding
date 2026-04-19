async function test() {
  const c = await fetch('http://localhost:3000/api/content').then(r => r.json());
  console.log("Current gallery items:", c.gallery);
  
  if (c.gallery.length > 0) {
     const id = c.gallery[0].id;
     console.log(`Trying to delete ID ${id}`);
     const res = await fetch(`http://localhost:3000/api/gallery?id=${id}`, { method: 'DELETE' });
     const text = await res.text();
     console.log(`Delete response: ${res.status} - ${text}`);
  } else {
     console.log("No gallery items to delete.");
  }
}
test();
