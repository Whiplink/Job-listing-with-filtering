const filterContainer = document.querySelector('.filter__container')
const filterList = document.querySelector('.filter__list')
const clear = document.getElementById('clear')
const jobList = document.querySelector('.job__list')

const e = e => document.createElement(e)

let data;
let filteredData;
let filter = []

fetch('./data.json')
.then(res => res.json())
.then(resData => {
  updateJobs(resData)
  data = resData
})

const updateJobs = dataArr => {
  while (jobList.firstChild) {
    jobList.removeChild(jobList.firstChild)
  }
  dataArr.forEach(x => {
    displayJobs(x)
  })
}

const updateFilterDisplay = () => {
  if(filter.length == 0) {
    filterContainer.style.visibility = 'hidden'
  } else {
    filterContainer.style.visibility = 'visible'

    while(filterList.firstChild) {
      filterList.removeChild(filterList.firstChild)
    }

    filter.forEach(x => {
      const filterTag = e('div')
      filterTag.classList.add('filter')
      const p = e('p')
      const removeContainer = e('div')
      removeContainer.classList.add('remove__container')
      removeContainer.addEventListener('click', () => {
        filter = filter.filter(filt => filt != x)
        updateFilterDisplay()
        updateJobsWithFilter()

      })
    
      const img = e('img')
  
      p.textContent = x
      img.setAttribute('src', './images/icon-remove.svg')

      removeContainer.appendChild(img)

      filterTag.append(p, removeContainer)

      filterList.appendChild(filterTag)
    })

  }

}

const updateJobsWithFilter = () => {
  filteredData = data.filter(job => {
    const jobTags = [job.role, job.level, ...job.languages, ...job.tools]

    for(let i = 0; i < filter.length; i++) {
      if(!jobTags.includes(filter[i])) return false
    }
    return true
  })

  updateJobs(filteredData)
}

const appendFilter = x => {
  if(filter.includes(x)) return
  filter.push(x)
  updateFilterDisplay()
  updateJobsWithFilter()
}

const displayJobs = ({
  id,
  company,
  logo,
  new: newAdded,
  featured,
  position,
  role,
  level,
  postedAt,
  contract,
  location,
  languages,
  tools
}) => {

  const JobContainer = e('div')
  JobContainer.classList.add('job__container')

  const Logo = e('img')
  Logo.setAttribute('src', logo)

  const Description = e('div')
  Description.classList.add('description')

  const CompanyName = e('div')
  CompanyName.classList.add('company-name')
  const Company = e('p')
  Company.textContent = company
  CompanyName.appendChild(Company)
  if(newAdded) {
    const newTag = e('div')
    newTag.classList.add('new-tag')
    newTag.textContent = 'NEW!'
    CompanyName.appendChild(newTag)
  }
  if(featured) {
    const featuredBg = e('div')
    featuredBg.classList.add('featured-bg')
    JobContainer.appendChild(featuredBg)

    const featuredTag = e('div')
    featuredTag.classList.add('featured-tag')
    featuredTag.textContent = 'FEATURED'
    CompanyName.appendChild(featuredTag)
  }

  const Position = e('p')
  Position.textContent = position

  const Details = e('p')
  Details.textContent = `${postedAt} · ${contract} · ${location}`

  Description.append(CompanyName, Position, Details)

  const Tags = e('div')
  Tags.classList.add('tags')
  const Role = e('div')
  Role.classList.add('tag')
  Role.textContent = role
  Role.addEventListener('click', () => {
    // console.log(Role.textContent)
    appendFilter(Role.textContent)
  })
  const Level = e('div')
  Level.classList.add('tag')
  Level.textContent = level
  Level.addEventListener('click', () => {
    // console.log(Level.textContent)
    appendFilter(Level.textContent)
  })
  Tags.append(Role, Level)
  languages.forEach(x => {
    const Tag = e('div')
    Tag.classList.add('tag')
    Tag.textContent = x
    Tag.addEventListener('click', () => {
      // console.log(Tag.textContent)
      appendFilter(Tag.textContent)
    })
    Tags.appendChild(Tag)
  })
  tools.forEach(x => {
    const Tag = e('div')
    Tag.classList.add('tag')
    Tag.textContent = x
    Tag.addEventListener('click', () => {
      // console.log(Tag.textContent)
      appendFilter(Tag.textContent)
    })
    Tags.appendChild(Tag)
  })
  
  JobContainer.append(Logo, Description, Tags)

  jobList.appendChild(JobContainer)
}

clear.addEventListener('click', () => {
  filter = []
  updateFilterDisplay()
  updateJobsWithFilter()
})

filterContainer.style.visibility = 'hidden'